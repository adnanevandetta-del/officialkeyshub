import { NextResponse } from "next/server";
import { saveLead, type Lead } from "../../lib/leads";
import { allProducts } from "../../lib/catalog";

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const clip = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : undefined);

// Junk filters. Rejected submissions get the same quiet 202 as a real one, so
// scripts can't tell what was filtered.
const ALLOWED_HOSTS = /^(www\.)?officialkeyshub\.com$|^officialkeyshub[a-z0-9-]*\.vercel\.app$|^localhost$|^127\.0\.0\.1$/;
const JUNK_DOMAIN = /(^|\.)(example\.(com|org|net)|test\.com|test|invalid|example|localhost|mailinator\.com|guerrillamail\.com|10minutemail\.com|tempmail\.com|temp-mail\.org|yopmail\.com|sharklasers\.com|trashmail\.com)$/;
const PRODUCT_NAMES = new Set(allProducts.map((p) => p.name));
// "Custom Bundle: A + B" (from the bundle builder) is real when every part is.
const isRealProduct = (name: string) =>
  PRODUCT_NAMES.has(name) ||
  (name.startsWith("Custom Bundle: ") && name.slice(15).split(" + ").every((n) => PRODUCT_NAMES.has(n)));
const quietlyIgnored = () => NextResponse.json({ ok: true, stored: false }, { status: 202 });

function fromOurSite(req: Request): boolean {
  const origin = req.headers.get("origin") ?? req.headers.get("referer");
  if (!origin) return false;
  try {
    return ALLOWED_HOSTS.test(new URL(origin).hostname);
  } catch {
    return false;
  }
}

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

  if (!fromOurSite(req) || JUNK_DOMAIN.test(email.split("@")[1])) return quietlyIgnored();

  const items = Array.isArray(body.items)
    ? body.items.slice(0, 20).map((i: Record<string, unknown>) => ({
        name: clip(i?.name, 400) ?? "",
        price: clip(i?.price, 20) ?? "",
        quantity: Math.min(99, Math.max(1, Number(i?.quantity) || 1)),
      }))
    : undefined;

  // A real checkout always carries at least one product from our catalog.
  if (type === "checkout" && !(items?.length && items.every((i) => isRealProduct(i.name)))) {
    return quietlyIgnored();
  }

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
