const json = (payload, status, origin) => new Response(JSON.stringify(payload), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff'
  }
});

const text = (value, max) => String(value || '').trim().slice(0, max);
const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
    if (!allowed.includes(origin)) return json({ error: 'Origin not allowed' }, 403, allowed[0] || 'https://witerstudio.online');
    if (request.method === 'OPTIONS') return json({ ok: true }, 200, origin);
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, origin);
    if (!String(request.headers.get('Content-Type') || '').includes('application/json')) return json({ error: 'Expected JSON' }, 415, origin);

    let body;
    try { body = await request.json(); } catch (_) { return json({ error: 'Invalid request' }, 400, origin); }
    if (text(body.website, 200)) return json({ ok: true }, 200, origin);

    const name = text(body.name, 100);
    const email = text(body.email, 180).toLowerCase();
    const category = text(body.category, 60) || 'Other';
    const timeline = text(body.timeline, 80) || 'Not decided';
    const message = text(body.message, 4000);
    if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Please check the required fields' }, 422, origin);
    const safe = { name: escapeHtml(name), email: escapeHtml(email), category: escapeHtml(category), timeline: escapeHtml(timeline), message: escapeHtml(message).replace(/\n/g, '<br>') };
    try {
      await env.EMAIL.send({
        from: { email: env.CONTACT_FROM, name: 'WITER' },
        to: env.CONTACT_TO,
        replyTo: email,
        subject: `WITER / ${category} — ${name}`,
        text: `NEW WITER REQUEST\n\n${name}\n${email}\n${category}\n${timeline}\n\n${message}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto"><p style="font:12px monospace">NEW WITER REQUEST</p><h1 style="font-size:38px">${safe.name}</h1><table style="width:100%;border-collapse:collapse"><tr><td style="padding:12px 0;border-top:1px solid #bbb">EMAIL</td><td style="padding:12px 0;border-top:1px solid #bbb">${safe.email}</td></tr><tr><td style="padding:12px 0;border-top:1px solid #bbb">CATEGORY</td><td style="padding:12px 0;border-top:1px solid #bbb">${safe.category}</td></tr><tr><td style="padding:12px 0;border-top:1px solid #bbb">START</td><td style="padding:12px 0;border-top:1px solid #bbb">${safe.timeline}</td></tr></table><p style="font-size:18px;line-height:1.55;border-top:1px solid #bbb;padding-top:24px">${safe.message}</p></div>`
      });
    } catch (error) {
      console.error('Cloudflare Email error', error?.code, error?.message);
      return json({ error: 'Could not deliver the message' }, 502, origin);
    }
    return json({ ok: true }, 200, origin);
  }
};
