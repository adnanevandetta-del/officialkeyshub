import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductImage } from "../lib/productImage";
import { catalog, categoryLabel, slugify, type CatalogCategory } from "../lib/catalog";

const SITE = "https://www.officialkeyshub.com";

export const metadata: Metadata = {
  title: "All Products — Genuine Microsoft Keys",
  description:
    "Browse every genuine Microsoft software key at Official Keys Hub — Windows 11 & 10, Office 2021 & 365, Windows Server, Visio, Project, SQL Server, Visual Studio and security software. Instant delivery, 30-day money-back guarantee.",
  keywords:
    "buy windows key, buy office key, cheap microsoft keys, genuine software licenses, windows 11 pro key, office 2021 key, windows server key, all products",
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    title: "All Products — Genuine Microsoft Keys | Official Keys Hub",
    description: "Every genuine Windows, Office and Server key in one place. Instant delivery, money-back guarantee.",
    url: `${SITE}/products`,
    type: "website",
  },
};

export default function ProductsIndexPage() {
  const categories = Object.keys(catalog) as CatalogCategory[];
  const total = categories.reduce((n, c) => n + catalog[c].length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Products — Official Keys Hub",
    url: `${SITE}/products`,
    description: `Browse ${total} genuine Microsoft software keys.`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb + hero */}
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-semibold">All Products</span>
          </nav>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
              All <span className="gradient-text">Products</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              {total} genuine Microsoft licenses — Windows, Office, Server and more. Every key activates
              directly with Microsoft, is delivered instantly, and is backed by a 30-day money-back guarantee.
            </p>
          </div>

          {/* Category jump nav */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <a
                key={c}
                href={`#${c}`}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-700 shadow-sm hover:text-blue-700 hover:border-blue-300 transition-colors"
              >
                {categoryLabel[c]}
              </a>
            ))}
          </div>

          {/* Sections */}
          {categories.map((c) => (
            <section key={c} id={c} className="mb-14 scroll-mt-24">
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900">{categoryLabel[c]}</h2>
                <span className="text-gray-400 text-sm">{catalog[c].length} products</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {catalog[c].map((p) => (
                  <Link
                    key={p.name}
                    href={`/products/${slugify(p.name)}`}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="relative h-28 mb-3 rounded-lg bg-gradient-to-b from-gray-50 to-white border border-gray-100 overflow-hidden flex items-center justify-center">
                      <Image src={getProductImage(p.name)} alt={p.name} fill unoptimized className="object-contain p-2" />
                      {p.badge && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-900 text-sm font-semibold line-clamp-2 mb-2 flex-grow">{p.name}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-gray-900">{p.price}</span>
                      {p.originalPrice && <span className="text-xs text-gray-400 line-through">{p.originalPrice}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
