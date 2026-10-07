import Link from "next/link";

// Homepage promo for the partner (affiliate) program. Copy sticks to the
// program's published terms on /partner-program: commission tiers, free to
// join, payout methods. Solid colours, Microsoft blue accents.
const tiers = [
  { name: "Starter", sales: "0–10 sales / month", pct: "15%" },
  { name: "Professional", sales: "11–50 sales / month", pct: "25%", featured: true },
  { name: "Enterprise", sales: "51+ sales / month", pct: "30%" },
];

const WHATSAPP_JOIN = "https://wa.me/16019756129?text=" + encodeURIComponent("Hi! I want to join the Partner Program");

export default function PartnerProgramPromo() {
  return (
    <section className="bg-white py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 bg-[#E6F0F8] text-[#004578] text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full mb-4">
            <i className="fas fa-handshake"></i> Partner Program
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Earn up to <span className="text-[#005A9E]">30% commission</span> on every sale you refer
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0">
            Bloggers, IT consultants, PC shops and creators: recommend genuine Microsoft licenses to your audience and
            earn on every order. Free to join, no upfront costs.
          </p>
          <ul className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm font-semibold text-gray-700 mb-8">
            <li><i className="fas fa-circle-check text-[#005A9E] mr-2"></i>Free to join</li>
            <li><i className="fas fa-circle-check text-[#005A9E] mr-2"></i>PayPal, bank or USDT payouts</li>
            <li><i className="fas fa-circle-check text-[#005A9E] mr-2"></i>Marketing materials included</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href={WHATSAPP_JOIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#005A9E] text-white font-bold rounded-xl hover:bg-[#004578] transition"
            >
              <i className="fab fa-whatsapp text-lg"></i> Become a partner
            </a>
            <Link
              href="/partner-program"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#005A9E] font-bold rounded-xl border border-[#005A9E]/30 hover:border-[#005A9E] transition"
            >
              How it works <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>

        {/* Phones: compact stacked rows. sm+: three cards side by side. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl px-5 py-4 sm:p-5 border flex items-center justify-between sm:block sm:text-center ${
                t.featured ? "bg-[#005A9E] border-[#005A9E] text-white shadow-xl lg:-translate-y-3" : "bg-slate-50 border-slate-200 text-gray-900"
              }`}
            >
              <div className="text-left sm:text-center">
                <p className={`text-xs font-bold uppercase tracking-wide sm:mb-2 ${t.featured ? "text-white" : "text-gray-500"}`}>{t.name}</p>
                <p className={`text-[11px] font-semibold sm:hidden ${t.featured ? "text-white" : "text-gray-600"}`}>{t.sales}</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-black sm:mb-1 text-right sm:text-center">{t.pct}</p>
                <p className={`text-xs text-right sm:text-center ${t.featured ? "text-white" : "text-gray-500"}`}>commission</p>
              </div>
              <p className={`hidden sm:block mt-3 text-[11px] font-semibold ${t.featured ? "text-white" : "text-gray-600"}`}>{t.sales}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
