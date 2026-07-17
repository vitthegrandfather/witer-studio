import { EmailMessage } from 'cloudflare:email';

const encoder = new TextEncoder();
const json = (payload, status = 200, origin = '') => new Response(JSON.stringify(payload), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff'
  }
});

const text = (value, max) => String(value || '').trim().slice(0, max);
const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
const singleLine = value => String(value).replace(/[\r\n]+/g, ' ').trim();
const base64 = value => {
  const bytes = encoder.encode(String(value));
  let binary = '';
  for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  return btoa(binary).match(/.{1,76}/g)?.join('\r\n') || '';
};
const base64Url = bytes => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};
const encodedHeader = value => `=?UTF-8?B?${base64(singleLine(value)).replace(/\r\n/g, '')}?=`;
const buildEmail = ({ from, to, replyTo, subject, plain, html }) => {
  const boundary = `witer-${crypto.randomUUID()}`;
  return [
    `From: WITER Website <${from}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${encodedHeader(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    base64(plain),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    base64(html),
    `--${boundary}--`,
    ''
  ].join('\r\n');
};

async function signToken(payload, secret) {
  const body = base64Url(encoder.encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  return `${body}.${base64Url(new Uint8Array(signature))}`;
}

async function verifyToken(request, secret) {
  const token = String(request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const [body, signature] = token.split('.');
  if (!body || !signature) return false;
  try {
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    const normalized = signature.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(normalized + '='.repeat((4 - normalized.length % 4) % 4)), char => char.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, bytes, encoder.encode(body));
    if (!valid) return false;
    const normalizedBody = body.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(normalizedBody + '='.repeat((4 - normalizedBody.length % 4) % 4)));
    return payload.scope === 'admin' && Number(payload.exp) > Date.now();
  } catch (_) {
    return false;
  }
}

async function handleLogin(request, env, origin) {
  let body;
  try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request' }, 400, origin); }
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const cutoff = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  await env.DB.prepare('DELETE FROM auth_attempts WHERE created_at < ?').bind(cutoff).run();
  const attempts = await env.DB.prepare('SELECT COUNT(*) AS count FROM auth_attempts WHERE ip = ?').bind(ip).first();
  if (Number(attempts?.count || 0) >= 5) return json({ error: 'Too many attempts. Try again later.' }, 429, origin);
  if (String(body.password || '') !== env.ADMIN_PASSWORD) {
    await env.DB.prepare('INSERT INTO auth_attempts (ip, created_at) VALUES (?, ?)').bind(ip, new Date().toISOString()).run();
    return json({ error: 'Invalid password' }, 401, origin);
  }
  await env.DB.prepare('DELETE FROM auth_attempts WHERE ip = ?').bind(ip).run();
  const token = await signToken({ scope: 'admin', exp: Date.now() + 12 * 60 * 60 * 1000 }, env.SESSION_SECRET);
  return json({ ok: true, token }, 200, origin);
}

async function handleAdmin(request, env, origin, pathname) {
  if (!await verifyToken(request, env.SESSION_SECRET)) return json({ error: 'Unauthorized' }, 401, origin);
  if (request.method === 'GET' && pathname === '/admin/messages') {
    const result = await env.DB.prepare(`SELECT id, name, email, category, timeline, message, created_at, is_read, email_status
      FROM messages ORDER BY created_at DESC LIMIT 500`).all();
    return json({ ok: true, messages: result.results || [] }, 200, origin);
  }
  if (request.method === 'DELETE' && pathname === '/admin/messages') {
    await env.DB.prepare('DELETE FROM messages').run();
    return json({ ok: true }, 200, origin);
  }
  const match = pathname.match(/^\/admin\/messages\/(\d+)$/);
  if (match && request.method === 'DELETE') {
    await env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(Number(match[1])).run();
    return json({ ok: true }, 200, origin);
  }
  if (match && request.method === 'PATCH') {
    await env.DB.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').bind(Number(match[1])).run();
    return json({ ok: true }, 200, origin);
  }
  return json({ error: 'Not found' }, 404, origin);
}

async function handleSubmit(request, env, origin) {
  if (!String(request.headers.get('Content-Type') || '').includes('application/json')) return json({ error: 'Expected JSON' }, 415, origin);
  let body;
  try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request' }, 400, origin); }
  if (text(body.website, 200)) return json({ ok: true }, 200, origin);

  const name = text(body.name, 100);
  const email = text(body.email, 180).toLowerCase();
  const category = singleLine(text(body.category, 60)) || 'Other';
  const timeline = singleLine(text(body.timeline, 80)) || 'Not decided';
  const message = text(body.message, 4000);
  if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Please check the required fields' }, 422, origin);

  const createdAt = new Date().toISOString();
  const inserted = await env.DB.prepare(`INSERT INTO messages (name, email, category, timeline, message, created_at, email_status)
    VALUES (?, ?, ?, ?, ?, ?, 'pending') RETURNING id`).bind(name, email, category, timeline, message, createdAt).first();
  const safe = { name: escapeHtml(name), email: escapeHtml(email), category: escapeHtml(category), timeline: escapeHtml(timeline), message: escapeHtml(message).replace(/\n/g, '<br>') };
  try {
    const raw = buildEmail({
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO,
      replyTo: email,
      subject: `WITER / ${category} — ${singleLine(name)}`,
      plain: `NEW WITER REQUEST\n\n${name}\n${email}\n${category}\n${timeline}\n\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto"><p style="font:12px monospace">NEW WITER REQUEST</p><h1 style="font-size:38px">${safe.name}</h1><table style="width:100%;border-collapse:collapse"><tr><td style="padding:12px 0;border-top:1px solid #bbb">EMAIL</td><td style="padding:12px 0;border-top:1px solid #bbb">${safe.email}</td></tr><tr><td style="padding:12px 0;border-top:1px solid #bbb">CATEGORY</td><td style="padding:12px 0;border-top:1px solid #bbb">${safe.category}</td></tr><tr><td style="padding:12px 0;border-top:1px solid #bbb">START</td><td style="padding:12px 0;border-top:1px solid #bbb">${safe.timeline}</td></tr></table><p style="font-size:18px;line-height:1.55;border-top:1px solid #bbb;padding-top:24px">${safe.message}</p></div>`
    });
    await env.EMAIL.send(new EmailMessage(env.CONTACT_FROM, env.CONTACT_TO, raw));
    await env.DB.prepare("UPDATE messages SET email_status = 'sent' WHERE id = ?").bind(inserted.id).run();
    return json({ ok: true, stored: true, delivered: true }, 200, origin);
  } catch (error) {
    console.error('Cloudflare Email error', error?.code, error?.message);
    await env.DB.prepare("UPDATE messages SET email_status = 'failed', email_error = ? WHERE id = ?")
      .bind(text(`${error?.code || ''} ${error?.message || ''}`, 500), inserted.id).run();
    return json({ ok: true, stored: true, delivered: false }, 202, origin);
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
    if (!allowed.includes(origin)) return json({ error: 'Origin not allowed' }, 403, allowed[0] || 'https://witerstudio.online');
    if (request.method === 'OPTIONS') return json({ ok: true }, 200, origin);
    const { pathname } = new URL(request.url);
    if (pathname === '/submit' && request.method === 'POST') return handleSubmit(request, env, origin);
    if (pathname === '/admin/login' && request.method === 'POST') return handleLogin(request, env, origin);
    if (pathname.startsWith('/admin/messages')) return handleAdmin(request, env, origin, pathname);
    return json({ error: 'Not found' }, 404, origin);
  }
};
