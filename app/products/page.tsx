import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductBoxImage } from "../lib/productImage";
import { catalog, categoryLabel, slugify, type CatalogCategory, type CatalogProduct } from "../lib/catalog";

const SITE = "https://www.officialkeyshub.com";

export const metadata: Metadata = {
  title: "All Products — Genuine Microsoft Keys",
  description:
    "Browse keys for Windows 11 & 10, Office 2024 & 2021, Windows Server, Visio, Project, SQL Server and Visual Studio. Emailed after payment, 30-day money-back guarantee.",
  keywords:
    "buy windows key, buy office key, cheap microsoft keys, software licenses, windows 11 pro key, office 2021 key, windows server key, all products",
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    images: [{ url: "https://www.officialkeyshub.com/og-image.jpg", width: 1200, height: 630, alt: "Official Keys Hub — Microsoft Windows & Office licenses" }],
    title: "All Products — Genuine Microsoft Keys | Official Keys Hub",
    description: "Every Windows, Office and Server key in one place. Emailed after payment, money-back guarantee.",
    url: `${SITE}/products`,
    type: "website",
  },
};

const ICON: Record<CatalogCategory, { icon: string; tint: string }> = {
  bundles: { icon: "fas fa-box-open", tint: "bg-amber-50 text-amber-600 border-amber-200" },
  windows: { icon: "fab fa-windows", tint: "bg-sky-50 text-[#0067b8] border-sky-200" },
  office: { icon: "fas fa-file-word", tint: "bg-orange-50 text-[#e3611f] border-orange-200" },
  server: { icon: "fas fa-server", tint: "bg-slate-100 text-slate-600 border-slate-200" },
  visio: { icon: "fas fa-diagram-project", tint: "bg-teal-50 text-teal-600 border-teal-200" },
  project: { icon: "fas fa-list-check", tint: "bg-green-50 text-green-700 border-green-200" },
  sql: { icon: "fas fa-database", tint: "bg-red-50 text-red-600 border-red-200" },
  visualstudio: { icon: "fas fa-code", tint: "bg-violet-50 text-violet-600 border-violet-200" },
  antivirus: { icon: "fas fa-shield-halved", tint: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

const money = (p: string) => {
  const n = parseFloat(p.replace(/[^0-9.]/g, ""));
  return isFinite(n) ? "$" + n.toFixed(2) : p;
};

// Best sellers first, legacy versions (Windows 7/8.1, 2010–2016 editions) last.
const legacy = (name: string) => /Windows (7|8\.1)\b|\b201[0-6]\b/.test(name);
const ordered = (list: CatalogProduct[]) =>
  list
    .map((p, i) => ({ p, i, r: p.popular ? 0 : legacy(p.name) ? 2 : 1 }))
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .map((x) => x.p);

export default function ProductsIndexPage() {
  const categories = Object.keys(catalog) as CatalogCategory[];
  const total = categories.reduce((n, c) => n + catalog[c].length, 0);
  const lowest = Math.min(...categories.flatMap((c) => catalog[c].map((p) => parseFloat(p.price.replace(/[^0-9.]/g, "")) || Infinity)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Products — Official Keys Hub",
    url: `${SITE}/products`,
    description: `Browse ${total} Microsoft and security software keys.`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="bg-white">
        {/* Header band */}
        <section className="relative overflow-hidden bg-[radial-gradient(60%_90%_at_80%_30%,#15408a,#0a1f4d_55%,#061230)] text-white">
          <div className="relative max-w-7xl mx-auto px-4 pt-6 pb-10 md:pt-8 md:pb-14 grid md:grid-cols-[1.2fr_1fr] gap-6 items-center">
            <div>
              <nav className="text-sm text-white/60 mb-5 flex items-center gap-2" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white">Home</Link>
                <span aria-hidden="true">/</span>
                <span className="text-white font-semibold">All products</span>
              </nav>
              <h1 className="okh-wordmark text-4xl md:text-6xl font-extrabold tracking-[-0.035em] leading-[1.02]">
                All products
              </h1>
              <p className="mt-4 text-white/75 text-base md:text-lg max-w-xl">
                {total} keys for Windows, Office, Server, developer tools and security. Pay once and activate on Microsoft&apos;s servers.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                <span><i className="fas fa-tag mr-1.5 text-sky-300" aria-hidden="true" />From ${lowest.toFixed(2)}</span>
                <span><i className="fas fa-envelope mr-1.5 text-sky-300" aria-hidden="true" />Emailed after payment</span>
                <span><i className="fas fa-rotate-left mr-1.5 text-sky-300" aria-hidden="true" />30-day money-back</span>
              </div>
            </div>
            {/* three boxes, fanned */}
            <div className="relative hidden md:block h-56" aria-hidden="true">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(70,165,255,.45),transparent)] blur-md" />
              {[
                { n: "Windows Server 2025 Standard", c: "left-[12%] top-6 -rotate-[10deg] scale-90" },
                { n: "Office 2024 Professional Plus", c: "right-[12%] top-6 rotate-[10deg] scale-90" },
                { n: "Windows 11 Pro", c: "left-1/2 -translate-x-1/2 top-0 z-10" },
              ].map((b) => (
                <div key={b.n} className={`absolute ${b.c}`}>
                  <Image src={getProductBoxImage(b.n)} alt="" width={141} height={195} unoptimized className="h-52 w-auto drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky category bar */}
        <div className="sticky top-[57px] md:top-[65px] z-30 bg-white/95 backdrop-blur border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((c) => (
                <a
                  key={c}
                  href={`#${c}`}
                  className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700 hover:border-[#0067b8]/40 hover:text-[#0067b8] transition-colors"
                >
                  <i className={`${ICON[c].icon} text-xs`} aria-hidden="true" />
                  {categoryLabel[c]}
                  <span className="text-xs font-medium text-slate-400">{catalog[c].length}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-20">
          {categories.map((c) => (
            <section key={c} id={c} className="mb-12 md:mb-16 scroll-mt-32">
              <div className="flex items-center gap-3 mb-5">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${ICON[c].tint}`}>
                  <i className={ICON[c].icon} aria-hidden="true" />
                </span>
                <h2 className="okh-wordmark text-2xl md:text-3xl font-extrabold tracking-[-0.025em] text-[#0b1736]">{categoryLabel[c]}</h2>
                <span className="ml-auto text-sm text-slate-400">{catalog[c].length} products</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {ordered(catalog[c]).map((p) => {
                  const spec = p.features.filter((f) => f !== "Instant Delivery").slice(0, 2).join(" · ");
                  return (
                    <Link
                      key={p.name}
                      href={`/products/${slugify(p.name)}`}
                      className={`group relative flex flex-col rounded-2xl sm:rounded-3xl bg-white border p-2.5 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(0,103,184,0.55)] ${
                        p.popular ? "border-[#0067b8]/40" : "border-[#dcecfb]"
                      } shadow-[0_14px_32px_-26px_rgba(0,103,184,0.45)]`}
                    >
                      {(p.popular || p.badge) && (
                        <span className="absolute left-3.5 top-3.5 sm:left-5 sm:top-5 z-10 rounded-full bg-[#0067b8] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-white">
                          {p.popular ? "Popular" : p.badge}
                        </span>
                      )}
                      <div className="relative h-32 sm:h-44 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#f2f8ff] to-[#e3f1ff] overflow-hidden">
                        <Image
                          src={getProductBoxImage(p.name)}
                          alt={`${p.name} box`}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className={`object-contain p-3 sm:p-4 drop-shadow-[0_12px_16px_rgba(2,40,80,0.22)] transition-transform duration-500 group-hover:scale-[1.05] ${p.outOfStock ? "opacity-40 grayscale" : ""}`}
                        />
                      </div>
                      <div className="flex flex-1 flex-col px-0.5 sm:px-1 pt-3 sm:pt-4">
                        <h3 className="text-[13px] sm:text-base font-bold leading-snug text-[#0b1f3a] line-clamp-2 min-h-[2.4em] group-hover:text-[#0067b8] transition-colors">
                          {p.name}
                        </h3>
                        {spec && <p className="mt-1 text-[11px] sm:text-xs text-slate-500 line-clamp-1">{spec}</p>}
                        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                          <span className="text-lg sm:text-2xl font-extrabold tabular-nums text-[#0b1f3a]">
                            {p.outOfStock ? <span className="text-sm font-bold text-slate-400">Sold out</span> : money(p.price)}
                          </span>
                          <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-sky-50 text-[#0067b8] transition-colors group-hover:bg-[#0067b8] group-hover:text-white">
                            <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
