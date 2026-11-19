import type { Metadata } from "next";
import { getLeads, leadsConfigured, type Lead } from "../../lib/leads";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Leads | Official Keys Hub", robots: { index: false, follow: false } };

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });

function itemsText(l: Lead) {
  return (l.items ?? []).map((i) => `${i.quantity}× ${i.name}`).join(", ");
}

export default async function LeadsPage() {
  const configured = leadsConfigured();
  const leads = configured ? await getLeads() : [];
  const signups = leads.filter((l) => l.type === "signup").length;
  const checkouts = leads.filter((l) => l.type === "checkout");
  const value = checkouts.reduce((s, l) => s + (l.total ?? 0), 0);

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-3xl font-extrabold">Leads</h1>
          {leads.length > 0 && (
            <a href="/admin/leads/csv" className="px-4 py-2 rounded-lg bg-sky-700 text-white font-bold hover:bg-sky-800">
              Download CSV
            </a>
          )}
        </div>

        {!configured && (
          <p className="p-4 rounded-lg bg-yellow-50 border border-yellow-300">
            The leads database isn&apos;t connected yet, so nothing is being saved.
          </p>
        )}

        {configured && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Stat label="Sign-ups" value={String(signups)} />
              <Stat label="Checkouts started" value={String(checkouts.length)} />
              <Stat label="Checkout value" value={`$${value.toFixed(2)}`} />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              A started checkout is not a paid order. Compare against PayPal/USDT/WhatsApp, then follow up with the
              people who didn&apos;t finish. Times are US Eastern.
            </p>
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3">When</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">What</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Order</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-gray-500">No leads yet.</td>
                    </tr>
                  )}
                  {leads.map((l, i) => (
                    <tr key={i} className="border-t border-gray-100 align-top">
                      <td className="p-3 whitespace-nowrap">{fmt(l.at)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${l.type === "checkout" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"}`}>
                          {l.type === "checkout" ? "Checkout" : "Sign-up"}
                        </span>
                      </td>
                      <td className="p-3">
                        <a href={`mailto:${l.email}`} className="text-sky-700 underline">{l.email}</a>
                        {l.name ? <div className="text-gray-500">{l.name}</div> : null}
                      </td>
                      <td className="p-3">{itemsText(l) || "—"}</td>
                      <td className="p-3 whitespace-nowrap">{l.total != null ? `$${l.total.toFixed(2)}` : "—"}</td>
                      <td className="p-3">{l.method ?? "—"}{l.promoCode ? <div className="text-gray-500">{l.promoCode}</div> : null}</td>
                      <td className="p-3 whitespace-nowrap">{l.orderId ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-extrabold">{value}</div>
    </div>
  );
}
