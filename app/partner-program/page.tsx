import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Partner Program — Earn up to 20% Commission | Official Keys Hub",
  description:
    "Recommend genuine Microsoft licenses and earn 10–20% commission on every completed order you refer. Free to join, personal referral code, monthly payouts via PayPal, USDT or bank transfer.",
  keywords: "affiliate program, partner program, microsoft keys affiliate, software affiliate program, referral program",
  alternates: { canonical: "https://www.officialkeyshub.com/partner-program" },
};

// Programme terms shown on this page and summarised on the homepage
// (app/components/PartnerProgramPromo.tsx) — keep the two in sync.
const tiers = [
  { name: "Starter", sales: "1–10 referred sales / month", pct: "10%", perks: ["Personal referral code", "Monthly payouts", "Email & WhatsApp support"] },
  { name: "Pro", sales: "11–50 referred sales / month", pct: "15%", perks: ["Everything in Starter", "Priority support", "Ready-made product images & copy"], featured: true },
  { name: "Elite", sales: "51+ referred sales / month", pct: "20%", perks: ["Everything in Pro", "Payouts every two weeks", "Early access to new products"] },
];

const steps = [
  { t: "Apply", d: "Message us on WhatsApp or email with where you'll promote (site, channel or shop). We reply within 1–2 business days." },
  { t: "Share your code", d: "You get a personal referral code. Customers enter it at checkout, and every order with your code is credited to you." },
  { t: "Get paid", d: "Commission is earned on completed orders once the 30-day money-back window has passed, then paid out monthly." },
];

const faqs = [
  {
    q: "Who can become a partner?",
    a: "Bloggers, YouTubers, IT consultants, PC repair shops and anyone with an audience that needs Windows or Office licenses. You need a real place to promote — a site, channel, social page or shop.",
  },
  {
    q: "How are referrals tracked?",
    a: "With your personal referral code. When a customer enters it at checkout, the order is recorded against your code. We send you a statement of your referred orders with every payout.",
  },
  {
    q: "When is commission paid?",
    a: "Commission is earned once an order is complete and its 30-day money-back window has passed (refunded orders don't earn commission). Payouts go out monthly — every two weeks on the Elite tier — once your balance reaches $50.",
  },
  {
    q: "How do I get paid?",
    a: "By PayPal, USDT or bank transfer — your choice.",
  },
  {
    q: "Is there a cost to join?",
    a: "No. The program is free to join, with no fees and no minimum sales commitment.",
  },
  {
    q: "Are there any rules?",
    a: "Promote honestly: no spam, no misleading claims, don't present yourself as Microsoft or as us, and don't bid on our brand name in paid search ads. Accounts that break these rules are closed and unpaid commission is forfeited.",
  },
];

const JOIN_WA = "https://wa.me/16019756129?text=" + encodeURIComponent("Hi! I'd like to apply for the Partner Program.");
const JOIN_MAIL = "mailto:officialkeyshub@gmail.com?subject=" + encodeURIComponent("Partner Program application");

export default function PartnerProgramPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#005A9E] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-[#004578] border border-white/20 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-wide">
            <i className="fas fa-handshake"></i> Partner Program
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight text-white">
            Earn up to 20% on every order you refer
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
            Recommend genuine Microsoft licenses to your audience and earn 10–20% commission on every completed order.
            Free to join, simple to track, paid monthly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={JOIN_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#005A9E] font-bold rounded-xl hover:bg-blue-50 transition"
            >
              <i className="fab fa-whatsapp text-lg"></i> Apply on WhatsApp
            </a>
            <a
              href={JOIN_MAIL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#004578] text-white font-bold rounded-xl border border-white/20 hover:bg-[#003A66] transition"
            >
              <i className="fas fa-envelope"></i> Apply by email
            </a>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Commission tiers</h2>
            <p className="text-lg text-gray-600">Your rate is set by the number of referred sales you make each month.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-2xl p-7 border ${t.featured ? "border-2 border-[#005A9E] shadow-xl" : "border-gray-200 shadow-sm"} bg-white`}
              >
                {t.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#005A9E] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Most common
                  </span>
                )}
                <p className="text-sm font-bold uppercase tracking-wide text-gray-500 text-center">{t.name}</p>
                <p className="text-5xl font-extrabold text-[#005A9E] text-center mt-3">{t.pct}</p>
                <p className="text-sm text-gray-500 text-center mt-1">commission per completed order</p>
                <p className="text-sm font-semibold text-gray-700 text-center mt-4 mb-5">{t.sales}</p>
                <ul className="space-y-2.5 border-t border-gray-100 pt-5">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-gray-700">
                      <i className="fas fa-check text-[#005A9E] mt-1"></i>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center mt-6">
            Example: refer 20 orders of Windows 11 Pro ($16.99) in a month on the Pro tier and you earn about $51.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.t} className="rounded-2xl bg-white border border-gray-200 p-7">
                <span className="inline-flex w-11 h-11 rounded-full bg-[#005A9E] text-white font-extrabold text-lg items-center justify-center mb-4">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.t}</h3>
                <p className="text-gray-700 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Questions & program rules</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-gray-200 bg-white p-5 open:shadow-md transition">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-lg text-gray-900">
                  {f.q}
                  <i className="fas fa-plus text-sm text-gray-400 transition group-open:rotate-45"></i>
                </summary>
                <p className="mt-3 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#005A9E]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to apply?</h2>
          <p className="text-lg text-white mb-8">Free to join. Tell us where you&apos;ll promote and we&apos;ll set up your referral code.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={JOIN_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#005A9E] font-bold rounded-xl hover:bg-blue-50 transition"
            >
              <i className="fab fa-whatsapp text-lg"></i> Apply on WhatsApp
            </a>
            <a
              href={JOIN_MAIL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#004578] text-white font-bold rounded-xl border border-white/20 hover:bg-[#003A66] transition"
            >
              <i className="fas fa-envelope"></i> Apply by email
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
