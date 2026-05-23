const enc = new TextEncoder();

export const base64url = {
  encode(input) {
    const bytes = typeof input === 'string' ? enc.encode(input) : input;
    let value = '';
    for (const byte of bytes) value += String.fromCharCode(byte);
    return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },
  decode(input) {
    const value = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=');
    const binary = atob(value);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  },
};

export async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(value));
  return base64url.encode(new Uint8Array(signature));
}

export async function signedCookie(payload, secret) {
  const body = base64url.encode(JSON.stringify(payload));
  return `${body}.${await sign(body, secret)}`;
}

export async function verifyCookie(cookie, secret) {
  if (!cookie || !cookie.includes('.')) return null;
  const [body, sig] = cookie.split('.');
  if (!body || !sig) return null;
  const expected = await sign(body, secret);
  if (expected !== sig) return null;
  try {
    const json = new TextDecoder().decode(base64url.decode(body));
    const payload = JSON.parse(json);
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getCookie(request, name) {
  const raw = request.headers.get('cookie') || '';
  const found = raw.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : '';
}
