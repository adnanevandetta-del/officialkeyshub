import { NextResponse } from "next/server";
import { saveLead, type Lead } from "../../lib/leads";

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const clip = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : undefined);

// Receives sign-ups and started checkouts from the browser.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = clip(body.email, 320)?.trim().toLowerCase();
  const type = body.type === "checkout" ? "checkout" : body.type === "signup" ? "signup" : null;
  if (!type || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const items = Array.isArray(body.items)
    ? body.items.slice(0, 20).map((i: Record<string, unknown>) => ({
        name: clip(i?.name, 120) ?? "",
        price: clip(i?.price, 20) ?? "",
        quantity: Math.min(99, Math.max(1, Number(i?.quantity) || 1)),
      }))
    : undefined;

  const lead: Lead = {
    type,
    email,
    name: clip(body.name, 80),
    items,
    total: typeof body.total === "number" && Number.isFinite(body.total) ? Math.round(body.total * 100) / 100 : undefined,
    method: clip(body.method, 20),
    promoCode: clip(body.promoCode, 20),
    orderId: clip(body.orderId, 30),
    page: clip(body.page, 200),
    at: new Date().toISOString(),
  };

  try {
    const stored = await saveLead(lead);
    return NextResponse.json({ ok: true, stored }, { status: stored ? 201 : 202 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
