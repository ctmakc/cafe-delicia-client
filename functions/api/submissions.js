function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'content-type': 'application/json; charset=utf-8', ...(init.headers || {}) },
  });
}

function clean(value, limit = 500) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, limit);
}

async function sendEmail(env, submission) {
  if (!env.RESEND_API_KEY || !env.RESEND_DEFAULT_TO || !env.RESEND_DEFAULT_FROM) return { skipped: true };
  const subject = `Cafe Delicia ${submission.type}: ${submission.name || submission.email || submission.orderNumber || submission.id}`;
  const rows = Object.entries(submission)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `<tr><td style="padding:6px 12px;color:#7a6e5b">${key}</td><td style="padding:6px 12px">${typeof value === 'object' ? `<pre>${escapeHtml(JSON.stringify(value, null, 2))}</pre>` : escapeHtml(String(value))}</td></tr>`)
    .join('');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_DEFAULT_FROM,
      to: [env.RESEND_DEFAULT_TO],
      subject,
      html: `<h2>Cafe Delicia submission</h2><table>${rows}</table>`,
    }),
  });
  if (!response.ok) return { skipped: false, error: await response.text() };
  return { skipped: false, ok: true };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  const type = clean(body.type, 40);
  if (!['contact', 'quick-contact', 'newsletter', 'order', 'bug'].includes(type)) {
    return json({ ok: false, error: 'Unsupported submission type.' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const id = `${type}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const submission = {
    id,
    type,
    createdAt: now,
    source: new URL(request.url).hostname,
  };

  if (type === 'newsletter') {
    const email = clean(body.email, 160);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: 'Email is required.' }, { status: 400 });
    Object.assign(submission, { email });
  } else if (type === 'order') {
    const customer = body.customer || {};
    if (!clean(customer.name) || (!clean(customer.phone) && !clean(customer.email)) || !clean(customer.date)) {
      return json({ ok: false, error: 'Name, contact, and pickup date are required.' }, { status: 400 });
    }
    Object.assign(submission, {
      orderNumber: clean(body.orderNumber, 20),
      customer: {
        name: clean(customer.name, 120),
        phone: clean(customer.phone, 80),
        email: clean(customer.email, 160),
        date: clean(customer.date, 80),
        window: clean(customer.window, 80),
        notes: clean(customer.notes, 1000),
      },
      items: Array.isArray(body.items) ? body.items.slice(0, 30).map((item) => ({
        id: clean(item.id, 80),
        name: clean(item.name, 160),
        qty: Number(item.qty || 1),
        size: clean(item.size, 120),
        price: Number(item.price || 0),
      })) : [],
      subtotal: Number(body.subtotal || 0),
      tax: Number(body.tax || 0),
      total: Number(body.total || 0),
    });
  } else if (type === 'bug') {
    if (!clean(body.message).length) {
      return json({ ok: false, error: 'Tell us what went wrong.' }, { status: 400 });
    }
    Object.assign(submission, {
      page: clean(body.page, 500),
      contact: clean(body.contact, 160),
      message: clean(body.message, 2000),
      userAgent: clean(body.userAgent, 500),
    });
  } else {
    if (!clean(body.name) || !clean(body.contact) || clean(body.message).length < 6) {
      return json({ ok: false, error: 'Name, contact, and message are required.' }, { status: 400 });
    }
    Object.assign(submission, {
      inquiry: clean(body.inquiry, 60),
      name: clean(body.name, 120),
      contact: clean(body.contact, 160),
      date: clean(body.date, 80),
      people: clean(body.people, 80),
      message: clean(body.message, 2000),
    });
  }

  if (env.SUBMISSIONS_KV) {
    await env.SUBMISSIONS_KV.put(`submission:${id}`, JSON.stringify(submission), {
      metadata: { type, createdAt: now },
    });
  }

  const email = await sendEmail(env, submission);
  return json({ ok: true, id, email });
}

export async function onRequestGet() {
  return json({ ok: true, endpoint: 'Cafe Delicia submissions' });
}
