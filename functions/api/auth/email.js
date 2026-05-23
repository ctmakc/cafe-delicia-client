import { signedCookie } from '../../_lib/crypto.js';

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'content-type': 'application/json; charset=utf-8', ...(init.headers || {}) },
  });
}

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || '').trim().toLowerCase();
  const name = String(body?.name || email.split('@')[0] || 'Guest').trim().slice(0, 120);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: 'Valid email is required.' }, { status: 400 });
  }

  const secret = env.AUTH_SECRET || env.GOOGLE_CLIENT_SECRET || 'local-dev-only';
  const session = await signedCookie({
    sub: `email:${email}`,
    name,
    email,
    provider: 'email',
    exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
  }, secret);

  return json({ ok: true }, {
    headers: {
      'set-cookie': `delicia_session=${encodeURIComponent(session)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
    },
  });
}
