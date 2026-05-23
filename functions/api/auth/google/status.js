function json(data) {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export async function onRequestGet({ env }) {
  return json({
    ok: true,
    enabled: env.GOOGLE_AUTH_ENABLED === 'true' && Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
  });
}
