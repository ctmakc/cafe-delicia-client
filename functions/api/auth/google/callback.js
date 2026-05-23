import { getCookie, signedCookie, verifyCookie } from '../../../_lib/crypto.js';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const secret = env.AUTH_SECRET || env.GOOGLE_CLIENT_SECRET;
  const statePayload = await verifyCookie(getCookie(request, 'delicia_oauth_state'), secret);

  if (!code || !state || !statePayload || statePayload.state !== state) {
    return new Response('Invalid OAuth state.', { status: 400 });
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${url.origin}/api/auth/google/callback`,
    }),
  });

  if (!tokenRes.ok) {
    return new Response('Google token exchange failed.', { status: 502 });
  }

  const tokens = await tokenRes.json();
  const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { authorization: `Bearer ${tokens.access_token}` },
  });
  if (!userRes.ok) {
    return new Response('Google profile fetch failed.', { status: 502 });
  }
  const profile = await userRes.json();
  const session = await signedCookie({
    sub: profile.sub,
    name: profile.name || profile.email,
    email: profile.email,
    picture: profile.picture,
    provider: 'google',
    exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
  }, secret);

  const redirectTo = statePayload.next || '/';
  const headers = new Headers({ location: `${url.origin}${redirectTo}` });
  headers.append('set-cookie', `delicia_session=${encodeURIComponent(session)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`);
  headers.append('set-cookie', 'delicia_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  return new Response(null, { status: 302, headers });
}
