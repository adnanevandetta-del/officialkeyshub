import { getLeads } from "../../../lib/leads";

export const dynamic = "force-dynamic";

const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

// CSV export of all leads (protected by the /admin Basic auth in middleware.ts).
export async function GET() {
  const leads = await getLeads(5000);
  const header = ["date", "type", "email", "name", "items", "total", "method", "promo_code", "order_id", "page"];
  const rows = leads.map((l) =>
    [
      l.at,
      l.type,
      l.email,
      l.name,
      (l.items ?? []).map((i) => `${i.quantity}x ${i.name}`).join("; "),
      l.total,
      l.method,
      l.promoCode,
      l.orderId,
      l.page,
    ]
      .map(cell)
      .join(",")
  );
  return new Response([header.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
