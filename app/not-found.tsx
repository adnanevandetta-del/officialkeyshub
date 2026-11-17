import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BlogShopStrip } from "./blog/BlogAds";

export const metadata: Metadata = {
  title: "Page Not Found | Official Keys Hub",
  robots: { index: false, follow: true },
};

// Branded 404: keeps visitors on the site with clear ways back in and the
// best-selling products, instead of Next's bare "page could not be found".
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-sky-50">
        <section className="py-16 md:py-24 bg-sky-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-6xl md:text-7xl font-extrabold text-sky-700 mb-4">404</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">This page doesn&apos;t exist</h1>
            <p className="text-lg text-gray-600 mb-8">
              The link may be old or mistyped. Everything you need is still one click away.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-bold transition-colors"
              >
                <i className="fas fa-store" /> Browse products
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-sky-600 text-gray-900 font-bold transition-colors"
              >
                <i className="fas fa-house" /> Home
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-sky-600 text-gray-900 font-bold transition-colors"
              >
                <i className="fas fa-book-open" /> Guides
              </Link>
            </div>
          </div>
        </section>
      </main>
      <BlogShopStrip
        topic="windows office"
        title="Popular right now"
        subtitle="Genuine Windows and Office licenses, emailed after payment with a 30-day money-back guarantee."
      />
      <Footer />
    </>
  );
}
