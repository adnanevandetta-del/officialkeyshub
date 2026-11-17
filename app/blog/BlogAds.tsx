import Image from "next/image";
import Link from "next/link";
import { canonicalProducts } from "../lib/catalog";
import { getProductBoxImage } from "../lib/productImage";
import { getProductByName, pickAdProducts, savingsPercent } from "../lib/blogAds";

// Product "ads" for blog pages. Dark navy cards so they pop on the white
// article layout; blue brand accents, white prices, green buy buttons (see the
// officialkeyshub-design skill). All data comes from the live catalog.

const CARD_BG = "bg-gradient-to-br from-[#071836] via-[#0b2a52] to-[#0369a1]";

/** One featured product, shown mid-article. Usable in MDX as <ProductAd name="Windows 11 Pro" />. */
export function ProductAd({ name, topic, label = "Deal pick for this guide" }: { name?: string; topic?: string; label?: string }) {
  const p = (name && getProductByName(name)) || pickAdProducts(topic ?? name ?? "", 1)[0];
  if (!p) return null;
  const save = savingsPercent(p);
  const href = `/products/${p.slug}`;
  return (
    <aside
      aria-label={`Featured product: ${p.name}`}
      className={`not-prose my-10 relative overflow-hidden rounded-2xl ${CARD_BG} text-white shadow-xl shadow-sky-900/20 ring-1 ring-white/10`}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="relative flex flex-col sm:flex-row items-center gap-5 p-6 sm:p-7">
        <Link href={href} className="shrink-0" aria-label={p.name}>
          <Image
            src={getProductBoxImage(p.name)}
            alt={`${p.name} product box`}
            width={564}
            height={780}
            unoptimized
            className="w-28 sm:w-32 h-auto drop-shadow-2xl transition-transform duration-300 hover:-rotate-3 hover:scale-105"
          />
        </Link>
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <span className="inline-block mb-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-[11px] font-bold uppercase tracking-wider">
            <i className="fas fa-bolt mr-1" /> {label}
          </span>
          <p className="text-xl font-extrabold leading-tight m-0">{p.name}</p>
          <p className="text-sm text-slate-300 mt-1 mb-3">{p.description}</p>
          <div className="flex items-baseline justify-center sm:justify-start gap-2 flex-wrap">
            <span className="text-3xl font-black text-white">{p.price}</span>
            <span className="text-white/40 line-through">{p.originalPrice}</span>
            {save > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-yellow-400 text-gray-900 text-xs font-black">-{save}%</span>
            )}
          </div>
          <p className="text-xs text-slate-300 mt-2 mb-0">
            <i className="fas fa-envelope mr-1" /> Emailed after payment · <i className="fas fa-rotate-left mx-1" /> 30-day money-back
          </p>
        </div>
        <Link
          href={href}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.03]"
        >
          Get it <i className="fas fa-arrow-right" />
        </Link>
      </div>
    </aside>
  );
}

/** "Shop this guide" grid shown at the end of every article and on the blog index. */
export function BlogShopStrip({
  topic,
  title = "Grab the keys from this guide",
  subtitle = "Genuine licenses that activate straight on Microsoft's servers. Prices update live from our catalog.",
  count = 3,
}: {
  topic: string;
  title?: string;
  subtitle?: string;
  count?: number;
}) {
  const products = pickAdProducts(topic, count);
  if (!products.length) return null;
  return (
    <section aria-label="Featured products" className="py-12 md:py-16 bg-[#05060b] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-sky-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-sky-600/20 border border-sky-600/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <i className="fas fa-tag mr-1" /> Shop the deals
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">{title}</h2>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className={`grid gap-5 ${products.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 max-w-3xl mx-auto"}`}>
          {products.map((p) => {
            const save = savingsPercent(p);
            const href = `/products/${p.slug}`;
            return (
              <div
                key={p.slug}
                className="group glass rounded-2xl border border-white/10 hover:border-sky-600/40 p-5 flex flex-col transition-all hover:-translate-y-1"
              >
                <Link href={href} className={`relative rounded-xl ${CARD_BG} h-44 flex items-center justify-center mb-4 overflow-hidden`}>
                  {p.badge && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-sky-600 text-white text-[10px] font-black uppercase">
                      {p.badge}
                    </span>
                  )}
                  {save > 0 && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-yellow-400 text-gray-900 text-xs font-black">-{save}%</span>
                  )}
                  <Image
                    src={getProductBoxImage(p.name)}
                    alt={`${p.name} product box`}
                    width={564}
                    height={780}
                    unoptimized
                    className="h-36 w-auto drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"
                  />
                </Link>
                <Link href={href} className="text-white font-bold leading-snug hover:text-sky-400 transition-colors">
                  {p.name}
                </Link>
                <ul className="mt-2 mb-4 space-y-1 text-sm text-slate-400">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f}>
                      <i className="fas fa-check text-sky-500 mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between gap-3">
                  <div>
                    <span className="text-2xl font-black text-white">{p.price}</span>
                    <span className="ml-2 text-sm text-white/40 line-through">{p.originalPrice}</span>
                  </div>
                  <Link
                    href={href}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-black transition-all"
                  >
                    Buy now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300">
            Browse all {canonicalProducts.length} products <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
