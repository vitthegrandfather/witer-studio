const PUBLIC_CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://contact.witerstudio.online",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "media-src 'self' https:",
  "frame-src https://challenges.cloudflare.com",
  "connect-src 'self' https://contact.witerstudio.online https://challenges.cloudflare.com",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  'upgrade-insecure-requests'
].join('; ');

const ADMIN_CSP = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data:",
  "connect-src https://contact.witerstudio.online",
  'upgrade-insecure-requests'
].join('; ');

const applyHeaders = (response, pathname) => {
  const secured = new Response(response.body, response);
  const admin = pathname === '/admin' || pathname === '/admin.html' || pathname.startsWith('/admin/');
  secured.headers.set('Content-Security-Policy', admin ? ADMIN_CSP : PUBLIC_CSP);
  secured.headers.set('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  secured.headers.set('X-Content-Type-Options', 'nosniff');
  secured.headers.set('X-Frame-Options', 'DENY');
  secured.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  secured.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()');
  secured.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  secured.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  secured.headers.set('Origin-Agent-Cluster', '?1');
  secured.headers.delete('Server');
  secured.headers.delete('X-Powered-By');
  if (admin) {
    secured.headers.set('Cache-Control', 'no-store, max-age=0');
    secured.headers.set('Pragma', 'no-cache');
    secured.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  }
  return secured;
};

export default {
  async fetch(request) {
    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD, OPTIONS', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
      });
    }
    const url = new URL(request.url);
    const response = await fetch(request);
    return applyHeaders(response, url.pathname);
  }
};
