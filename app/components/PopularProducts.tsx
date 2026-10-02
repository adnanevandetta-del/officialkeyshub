import Link from "next/link";
import { catalog, slugify, type CatalogCategory } from "../lib/catalog";

// Server-rendered internal links to top products across every category. The
// homepage is the site's highest-authority page, so these give Googlebot direct
// crawl paths to product pages (and pass link equity) instead of relying only on
// the sitemap and the client-rendered category grid. Plain <a> links, always in
// the initial HTML.
const PICKS: { cat: CatalogCategory; count: number }[] = [
  { cat: "windows", count: 3 },
  { cat: "office", count: 3 },
  { cat: "server", count: 1 },
  { cat: "visio", count: 1 },
  { cat: "project", count: 1 },
  { cat: "sql", count: 1 },
  { cat: "visualstudio", count: 1 },
  { cat: "antivirus", count: 2 },
];

function topProducts() {
  const out: { name: string; price: string; slug: string }[] = [];
  const seen = new Set<string>();
  for (const { cat, count } of PICKS) {
    const ordered = [...(catalog[cat] || [])].sort(
      (a, b) => Number(b.popular) - Number(a.popular)
    );
    let added = 0;
    for (const p of ordered) {
      if (added >= count) break;
      if (p.name.includes(" - ")) continue; // link the base product, not variants
      const slug = slugify(p.name);
      if (seen.has(slug)) continue;
      seen.add(slug);
      out.push({ name: p.name, price: p.price, slug });
      added++;
    }
  }
  return out;
}

export default function PopularProducts() {
  const products = topProducts();
  return (
    <section className="bg-[#070a12] border-t border-white/10 py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2 text-center">
          Popular <span className="gradient-text">products</span>
        </h2>
        <p className="text-slate-400 text-center text-sm mb-8">
          Genuine Microsoft &amp; security licenses — instant email delivery and lifetime activation.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex items-center justify-between gap-2 glass rounded-xl px-4 py-3 hover:border-sky-600/40 transition-colors"
            >
              <span className="text-slate-200 text-sm font-semibold group-hover:text-sky-400 line-clamp-1">
                {p.name}
              </span>
              <span className="text-white text-sm font-bold flex-shrink-0">{p.price}</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold text-sm"
          >
            View all products <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
