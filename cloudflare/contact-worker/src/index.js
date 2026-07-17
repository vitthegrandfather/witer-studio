import { EmailMessage } from 'cloudflare:email';

const encoder = new TextEncoder();
const SESSION_COOKIE = '__Host-witer_admin';
const SESSION_TTL = 2 * 60 * 60 * 1000;
const MAX_BODY_BYTES = 16 * 1024;

const corsHeaders = origin => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
  'Vary': 'Origin'
});

const json = (payload, status = 200, origin = '', extraHeaders = {}) => new Response(JSON.stringify(payload), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    ...corsHeaders(origin),
    'Cache-Control': 'no-store, max-age=0',
    'Pragma': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    ...extraHeaders
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
    `From: WITER Website <${from}>`, `To: ${to}`, `Reply-To: ${replyTo}`,
    `Subject: ${encodedHeader(subject)}`, 'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`, '',
    `--${boundary}`, 'Content-Type: text/plain; charset="UTF-8"', 'Content-Transfer-Encoding: base64', '', base64(plain),
    `--${boundary}`, 'Content-Type: text/html; charset="UTF-8"', 'Content-Transfer-Encoding: base64', '', base64(html),
    `--${boundary}--`, ''
  ].join('\r\n');
};

const parseCookie = request => Object.fromEntries(String(request.headers.get('Cookie') || '').split(';').map(part => {
  const index = part.indexOf('=');
  return index < 0 ? ['', ''] : [part.slice(0, index).trim(), part.slice(index + 1).trim()];
}).filter(([key]) => key));

const sessionCookie = token => `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${Math.floor(SESSION_TTL / 1000)}`;
const expiredSessionCookie = () => `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

async function sha256(value) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(String(value))));
}

async function safeEqual(left, right) {
  const [a, b] = await Promise.all([sha256(left), sha256(right)]);
  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) mismatch |= a[index] ^ b[index];
  return mismatch === 0;
}

async function hashId(value, secret) {
  const bytes = await sha256(`${secret}:${value}`);
  return base64Url(bytes);
}

async function signToken(payload, secret) {
  const body = base64Url(encoder.encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  return `${body}.${base64Url(new Uint8Array(signature))}`;
}

async function verifyToken(request, secret) {
  const token = parseCookie(request)[SESSION_COOKIE] || '';
  const [body, signature] = token.split('.');
  if (!body || !signature) return false;
  try {
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    const normalized = signature.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(normalized + '='.repeat((4 - normalized.length % 4) % 4)), char => char.charCodeAt(0));
    if (!await crypto.subtle.verify('HMAC', key, bytes, encoder.encode(body))) return false;
    const normalizedBody = body.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(normalizedBody + '='.repeat((4 - normalizedBody.length % 4) % 4)));
    return payload.scope === 'admin' && Number(payload.exp) > Date.now();
  } catch (_) {
    return false;
  }
}

async function readJson(request, origin) {
  const length = Number(request.headers.get('Content-Length') || 0);
  if (length > MAX_BODY_BYTES) return { response: json({ error: 'Request too large' }, 413, origin) };
  if (!String(request.headers.get('Content-Type') || '').includes('application/json')) return { response: json({ error: 'Expected JSON' }, 415, origin) };
  try {
    const reader = request.body?.getReader();
    if (!reader) return { response: json({ error: 'Invalid request' }, 400, origin) };
    const chunks = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return { response: json({ error: 'Request too large' }, 413, origin) };
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return { body: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch (_) {
    return { response: json({ error: 'Invalid request' }, 400, origin) };
  }
}

async function turnstileValid(token, request, env) {
  if (!token || !env.TURNSTILE_SECRET) return false;
  const form = new FormData();
  form.set('secret', env.TURNSTILE_SECRET);
  form.set('response', token);
  form.set('remoteip', request.headers.get('CF-Connecting-IP') || '');
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const result = await response.json().catch(() => ({}));
  return result.success === true && result.action === 'contact' && ['witerstudio.online', 'www.witerstudio.online'].includes(result.hostname);
}

async function handleLogin(request, env, origin) {
  const parsed = await readJson(request, origin);
  if (parsed.response) return parsed.response;
  const ip = await hashId(request.headers.get('CF-Connecting-IP') || 'unknown', env.SESSION_SECRET);
  if (env.LOGIN_RATE_LIMITER && !(await env.LOGIN_RATE_LIMITER.limit({ key: ip })).success) return json({ error: 'Too many attempts. Try again later.' }, 429, origin);
  const cutoff = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  await env.DB.prepare('DELETE FROM auth_attempts WHERE created_at < ?').bind(cutoff).run();
  const attempts = await env.DB.prepare('SELECT COUNT(*) AS count FROM auth_attempts WHERE ip = ?').bind(ip).first();
  if (Number(attempts?.count || 0) >= 5) return json({ error: 'Too many attempts. Try again later.' }, 429, origin);
  if (!await safeEqual(String(parsed.body.password || ''), env.ADMIN_PASSWORD || '')) {
    await env.DB.prepare('INSERT INTO auth_attempts (ip, created_at) VALUES (?, ?)').bind(ip, new Date().toISOString()).run();
    return json({ error: 'Invalid credentials' }, 401, origin);
  }
  await env.DB.prepare('DELETE FROM auth_attempts WHERE ip = ?').bind(ip).run();
  const token = await signToken({ scope: 'admin', exp: Date.now() + SESSION_TTL, nonce: crypto.randomUUID() }, env.SESSION_SECRET);
  return json({ ok: true }, 200, origin, { 'Set-Cookie': sessionCookie(token) });
}

async function handleAdmin(request, env, origin, pathname) {
  if (!await verifyToken(request, env.SESSION_SECRET)) return json({ error: 'Unauthorized' }, 401, origin, { 'Set-Cookie': expiredSessionCookie() });
  if (request.method === 'GET' && pathname === '/admin/session') return json({ ok: true }, 200, origin);
  if (request.method === 'POST' && pathname === '/admin/logout') return json({ ok: true }, 200, origin, { 'Set-Cookie': expiredSessionCookie() });
  if (request.method === 'GET' && pathname === '/admin/messages') {
    const result = await env.DB.prepare(`SELECT id, name, email, category, timeline, message, created_at, is_read, email_status FROM messages ORDER BY created_at DESC LIMIT 500`).all();
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
  const parsed = await readJson(request, origin);
  if (parsed.response) return parsed.response;
  const body = parsed.body;
  if (text(body.website, 200)) return json({ ok: true }, 200, origin);
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.FORM_RATE_LIMITER && !(await env.FORM_RATE_LIMITER.limit({ key: ip })).success) return json({ error: 'Too many requests. Try again later.' }, 429, origin);
  if (!await turnstileValid(text(body['cf-turnstile-response'] || body.turnstileToken, 2048), request, env)) return json({ error: 'Security check failed' }, 403, origin);

  const ipHash = await hashId(ip, env.SESSION_SECRET);
  const cutoff = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  await env.DB.prepare('DELETE FROM submission_attempts WHERE created_at < ?').bind(cutoff).run();
  const attempts = await env.DB.prepare('SELECT COUNT(*) AS count FROM submission_attempts WHERE ip_hash = ?').bind(ipHash).first();
  if (Number(attempts?.count || 0) >= 6) return json({ error: 'Too many requests. Try again later.' }, 429, origin);

  const name = text(body.name, 100);
  const email = text(body.email, 180).toLowerCase();
  const category = singleLine(text(body.category, 60)) || 'Other';
  const timeline = singleLine(text(body.timeline, 80)) || 'Not decided';
  const message = text(body.message, 4000);
  if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Please check the required fields' }, 422, origin);
  await env.DB.prepare('INSERT INTO submission_attempts (ip_hash, created_at) VALUES (?, ?)').bind(ipHash, new Date().toISOString()).run();

  const createdAt = new Date().toISOString();
  const inserted = await env.DB.prepare(`INSERT INTO messages (name, email, category, timeline, message, created_at, email_status) VALUES (?, ?, ?, ?, ?, ?, 'pending') RETURNING id`).bind(name, email, category, timeline, message, createdAt).first();
  const safe = { name: escapeHtml(name), email: escapeHtml(email), category: escapeHtml(category), timeline: escapeHtml(timeline), message: escapeHtml(message).replace(/\n/g, '<br>') };
  try {
    const raw = buildEmail({
      from: env.CONTACT_FROM, to: env.CONTACT_TO, replyTo: email,
      subject: `WITER / ${category} — ${singleLine(name)}`,
      plain: `NEW WITER REQUEST\n\n${name}\n${email}\n${category}\n${timeline}\n\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto"><p style="font:12px monospace">NEW WITER REQUEST</p><h1 style="font-size:38px">${safe.name}</h1><table style="width:100%;border-collapse:collapse"><tr><td style="padding:12px 0;border-top:1px solid #bbb">EMAIL</td><td style="padding:12px 0;border-top:1px solid #bbb">${safe.email}</td></tr><tr><td style="padding:12px 0;border-top:1px solid #bbb">CATEGORY</td><td style="padding:12px 0;border-top:1px solid #bbb">${safe.category}</td></tr><tr><td style="padding:12px 0;border-top:1px solid #bbb">START</td><td style="padding:12px 0;border-top:1px solid #bbb">${safe.timeline}</td></tr></table><p style="font-size:18px;line-height:1.55;border-top:1px solid #bbb;padding-top:24px">${safe.message}</p></div>`
    });
    await env.EMAIL.send(new EmailMessage(env.CONTACT_FROM, env.CONTACT_TO, raw));
    await env.DB.prepare("UPDATE messages SET email_status = 'sent' WHERE id = ?").bind(inserted.id).run();
    return json({ ok: true, stored: true, delivered: true }, 200, origin);
  } catch (error) {
    console.error('Cloudflare Email error', error?.code, error?.message);
    await env.DB.prepare("UPDATE messages SET email_status = 'failed', email_error = ? WHERE id = ?").bind(text(`${error?.code || ''} ${error?.message || ''}`, 500), inserted.id).run();
    return json({ ok: true, stored: true, delivered: false }, 202, origin);
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
    if (!allowed.includes(origin)) return json({ error: 'Origin not allowed' }, 403, allowed[0] || 'https://witerstudio.online');
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });
    const { pathname } = new URL(request.url);
    if (pathname === '/submit' && request.method === 'POST') return handleSubmit(request, env, origin);
    if (pathname === '/admin/login' && request.method === 'POST') return handleLogin(request, env, origin);
    if (pathname.startsWith('/admin/')) return handleAdmin(request, env, origin, pathname);
    return json({ error: 'Not found' }, 404, origin);
  }
};
