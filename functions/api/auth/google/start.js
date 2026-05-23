import { signedCookie } from '../../../_lib/crypto.js';

export async function onRequestGet({ request, env }) {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    return new Response('Google OAuth is not configured for this deployment.', { status: 503 });
  }

  const url = new URL(request.url);
  const origin = url.origin;
  const next = url.searchParams.get('next') || '/';
  const state = crypto.randomUUID();
  const secret = env.AUTH_SECRET || env.GOOGLE_CLIENT_SECRET;
  const stateCookie = await signedCookie({
    state,
    next: next.startsWith('/') ? next : '/',
    exp: Date.now() + 1000 * 60 * 10,
  }, secret);

  const auth = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  auth.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
  auth.searchParams.set('redirect_uri', `${origin}/api/auth/google/callback`);
  auth.searchParams.set('response_type', 'code');
  auth.searchParams.set('scope', 'openid email profile');
  auth.searchParams.set('state', state);
  auth.searchParams.set('prompt', 'select_account');

  return new Response(null, {
    status: 302,
    headers: {
      location: auth.toString(),
      'set-cookie': `delicia_oauth_state=${encodeURIComponent(stateCookie)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
