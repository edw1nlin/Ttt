function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
function parseSplitWith(value) {
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
export async function onRequestGet(context) {
  const result = await context.env.DB.prepare(
    `SELECT id, day, payer, amount_jpy AS amountJPY, original_amount AS originalAmount,
            original_currency AS originalCurrency, category, note, split_with AS splitWith,
            created_at AS createdAt
     FROM expenses
     ORDER BY created_at DESC`
  ).all();
  const expenses = result.results.map(row => ({ ...row, splitWith: parseSplitWith(row.splitWith) }));
  return json({ expenses });
}
export async function onRequestPost(context) {
  const body = await context.request.json();
  const id = body.id || crypto.randomUUID();
  await context.env.DB.prepare(
    `INSERT OR REPLACE INTO expenses
     (id, day, payer, amount_jpy, original_amount, original_currency, category, note, split_with)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    body.day || '',
    body.payer || '',
    Number(body.amountJPY || 0),
    Number(body.originalAmount || 0),
    body.originalCurrency || 'JPY',
    body.category || 'Other',
    body.note || '',
    JSON.stringify(body.splitWith || [])
  ).run();
  return json({ ok: true, id }, 201);
}
export async function onRequestDelete(context) {
  const id = new URL(context.request.url).searchParams.get('id');
  if (!id) return json({ error: 'Missing id' }, 400);
  await context.env.DB.prepare('DELETE FROM expenses WHERE id = ?').bind(id).run();
  return json({ ok: true });
}
