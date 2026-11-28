import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import LineIcon from "../components/LineIcon";
import CopyCode from "./CopyCode";
import BlackFridayBundles from "../components/BlackFridayBundles";
import { getProductByName } from "../lib/blogAds";
import { getProductBoxImage } from "../lib/productImage";
import { BF_CODE, BF_PERCENT, bfPrice, blackFridayActive } from "../lib/promo";

// Shows the deals while BF_ON is true (no end date), and a "sale ended" note after.

export const metadata: Metadata = {
  title: `Black Friday & Cyber Monday Windows & Office Key Deals: ${BF_PERCENT}% Off | Official Keys Hub`,
  description: `Black Friday and Cyber Monday sale: ${BF_PERCENT}% off every genuine Windows and Office key with code ${BF_CODE}. Windows 11 Pro, Office 2024 and bundles, emailed after payment, 30-day money-back guarantee.`,
  keywords: [
    "black friday windows 11 key",
    "black friday windows key deal",
    "black friday office 2024 deal",
    "black friday microsoft office deal",
    "cyber monday windows 11 key",
    "cyber monday office deal",
    "windows 11 pro black friday",
    "office 2024 black friday",
    "windows and office bundle black friday",
    "black friday software deals",
  ],
  alternates: { canonical: "/black-friday" },
  openGraph: {
    title: `Black Friday & Cyber Monday: ${BF_PERCENT}% off Windows & Office keys`,
    description: `Code ${BF_CODE} takes ${BF_PERCENT}% off every key in the store.`,
    url: "/black-friday",
    type: "website",
  },
};

const HERO = "Windows 11 Pro + Office 2024 Pro Plus Bundle";
const DEALS = [
  "Windows 11 Pro",
  "Office 2024 Professional Plus",
  "Windows 11 Home",
  "Office Home & Business 2024",
  "Visio Professional 2024",
  "Project Professional 2024",
  "Windows Server 2025 Standard",
  "Windows 11 Pro for Workstations",
];

const faqs = [
  {
    q: "How do I get the Black Friday discount?",
    a: `Add any key to your cart. At checkout, code ${BF_CODE} is applied for you; if it isn't, type it in the promo code box. It takes ${BF_PERCENT}% off your whole order.`,
  },
  {
    q: "How long does the sale last?",
    a: "For a limited time. The code works as long as the Black Friday banner is showing on the site.",
  },
  {
    q: "Is there a separate Cyber Monday sale?",
    a: `No, it's the same sale. Code ${BF_CODE} keeps working through Cyber Monday and for as long as the Black Friday banner is showing on the site.`,
  },
  {
    q: "Does the discount work with other codes?",
    a: `One code per order. ${BF_CODE} is the bigger discount, so use it instead of your 15% welcome code.`,
  },
  {
    q: "How fast do I get my key?",
    a: "Keys are emailed after payment is confirmed, usually within minutes. You activate them on Microsoft's own activation servers.",
  },
  {
    q: "What if a key doesn't work?",
    a: "Contact us and we'll help you activate it, replace it, or refund it under our 30-day money-back guarantee. Sale orders are covered exactly like any other order.",
  },
];

function num(price: string) {
  return parseFloat(price.replace(/[^0-9.]/g, ""));
}

export default function BlackFridayPage() {
  const active = blackFridayActive();
  const hero = getProductByName(HERO);
  const deals = DEALS.map((n) => getProductByName(n)).filter(Boolean) as NonNullable<ReturnType<typeof getProductByName>>[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="bg-white text-[#0b1f3a]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#07090f] text-white border-b border-[#f2c94c]/25">
          <div className="absolute inset-0 [background:radial-gradient(55%_70%_at_85%_15%,rgba(242,201,76,0.22),transparent_60%),radial-gradient(45%_60%_at_5%_95%,rgba(0,103,184,0.30),transparent_60%)]" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="text-center lg:text-left">
              <p className="bf-gold inline-block text-xs font-extrabold uppercase tracking-[0.24em]">
                Black Friday sale
              </p>
              <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05]">
                <span className="bf-gold">{BF_PERCENT}% off</span> all
                <span className="block">Windows & Office keys</span>
              </h1>
              {active ? (
                <>
                  <p className="mt-5 text-white/75 text-lg max-w-xl mx-auto lg:mx-0">
                    One code, the whole store. Genuine keys emailed after payment, activated on Microsoft&apos;s servers, with our 30-day money-back guarantee.
                  </p>
                  <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                    <CopyCode code={BF_CODE} />
                  </div>
                </>
              ) : (
                <p className="mt-5 text-white/75 text-lg">
                  The Black Friday sale has ended. Our everyday prices and 15% welcome code are still on.{" "}
                  <Link href="/products" className="text-emerald-400 font-bold hover:underline">Browse all keys</Link>
                </p>
              )}
            </div>

            {hero && (
              <div className="rounded-3xl bg-white text-[#0b1f3a] p-6 ring-2 ring-[#f2c94c]/70 shadow-[0_30px_70px_-25px_rgba(242,201,76,0.45)]">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8a6400]">Best Black Friday value</p>
                <div className="mt-3 flex items-center gap-5">
                  <Image src={getProductBoxImage(hero.name)} alt={`${hero.name} box`} width={564} height={780} unoptimized className="h-36 w-auto drop-shadow-[0_14px_18px_rgba(2,40,80,0.25)]" />
                  <div>
                    <p className="font-extrabold text-lg leading-snug">Windows 11 Pro + Office 2024 Pro Plus</p>
                    <p className="text-xs text-slate-500 mt-1">One PC · lifetime license · both keys emailed</p>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold tabular-nums">{active ? bfPrice(hero.price) : hero.price}</span>
                      {active && <span className="text-sm text-slate-400 line-through tabular-nums">{hero.price}</span>}
                    </div>
                    {active && <p className="text-xs text-slate-500 mt-0.5">with code {BF_CODE}</p>}
                  </div>
                </div>
                <Link
                  href={`/products/${hero.slug}`}
                  className="mt-5 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold transition-colors"
                >
                  Buy now <LineIcon name="arrowRight" className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Trust row */}
        <section className="border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
            {[
              ["mail", "Emailed after payment"],
              ["windows", "Activates on Microsoft"],
              ["refund", "30-day money-back"],
              ["lock", "PayPal, card or USDT"],
            ].map(([icon, label]) => (
              <div key={label} className="flex items-center justify-center gap-2">
                <LineIcon name={icon as "mail"} className="h-4 w-4 text-[#0067b8]" /> {label}
              </div>
            ))}
          </div>
        </section>

        {/* Bundles: the best value per order */}
        {active && <BlackFridayBundles />}

        {/* Deals grid */}
        <section className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#0067b8] text-xs font-bold uppercase tracking-[0.14em]">Sale prices</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] mt-1">The keys people buy most</h2>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-1.5 text-[#0067b8] font-bold hover:text-[#004e8c]">
              All {BF_PERCENT}% off <LineIcon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((p) => {
              const save = (num(p.price) - num(bfPrice(p.price))).toFixed(2);
              return (
                <div key={p.slug} className="rounded-3xl bg-white border border-[#dcecfb] shadow-[0_18px_40px_-22px_rgba(0,103,184,0.5)] p-5 flex flex-col">
                  <Link href={`/products/${p.slug}`} className="relative h-44 rounded-2xl bg-gradient-to-b from-[#f2f8ff] to-[#e3f1ff] flex items-center justify-center" aria-label={p.name}>
                    <Image src={getProductBoxImage(p.name)} alt={`${p.name} box`} width={564} height={780} unoptimized className="h-36 w-auto drop-shadow-[0_14px_18px_rgba(2,40,80,0.25)]" />
                  </Link>
                  <p className="mt-4 font-bold leading-snug min-h-[3rem]">{p.name}</p>
                  <div className="mt-auto pt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold tabular-nums">{active ? bfPrice(p.price) : p.price}</span>
                      {active && <span className="text-sm text-slate-400 line-through tabular-nums">{p.price}</span>}
                    </div>
                    {active && <p className="text-xs text-emerald-700 font-semibold mt-0.5">You save ${save} with {BF_CODE}</p>}
                  </div>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold transition-colors"
                  >
                    Buy now <LineIcon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            The code works on every key in the store, not just these.{" "}
            <Link href="/products" className="text-[#0067b8] font-semibold hover:underline">See all products</Link> or use the{" "}
            <Link href="/key-finder" className="text-[#0067b8] font-semibold hover:underline">key finder</Link>.
          </p>
        </section>

        {/* How it works */}
        <section className="bg-[#f4f9ff]">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-center">How the sale works</h2>
            <ol className="mt-8 grid md:grid-cols-3 gap-6">
              {[
                ["Pick your keys", "Add anything to your cart. The discount covers the whole order."],
                ["Check out", `${BF_CODE} is applied at checkout. Pay with PayPal, card, USDT or WhatsApp.`],
                ["Activate", "Your key is emailed after payment. Activate it in Settings or File → Account."],
              ].map(([t, d], i) => (
                <li key={t} className="rounded-2xl bg-white border border-[#dcecfb] p-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0067b8] text-white text-sm font-bold">{i + 1}</span>
                  <p className="mt-3 font-bold">{t}</p>
                  <p className="mt-1 text-sm text-slate-600">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-center">Questions about the sale</h2>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {f.q}
                  <span className="ml-4 text-slate-400 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            Full terms: <Link href="/refund-policy" className="text-[#0067b8] hover:underline">refund policy</Link> ·{" "}
            <Link href="/what-you-get" className="text-[#0067b8] hover:underline">what you get</Link>
          </p>
          <p className="mt-3 text-center text-sm text-slate-500">
            Not sure which key you need? Read our{" "}
            <Link href="/blog/black-friday-windows-office-key-deals" className="text-[#0067b8] font-semibold hover:underline">
              Black Friday buyer&apos;s guide
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
