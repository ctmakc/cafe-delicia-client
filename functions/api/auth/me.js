import { getCookie, verifyCookie } from '../../_lib/crypto.js';

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'content-type': 'application/json; charset=utf-8', ...(init.headers || {}) },
  });
}

export async function onRequestGet({ request, env }) {
  const secret = env.AUTH_SECRET || env.GOOGLE_CLIENT_SECRET || 'local-dev-only';
  const payload = await verifyCookie(getCookie(request, 'delicia_session'), secret);
  if (!payload) return json({ ok: true, user: null });
  return json({
    ok: true,
    user: {
      name: payload.name,
      email: payload.email,
      provider: payload.provider,
      avatar: payload.picture,
    },
  });
}
