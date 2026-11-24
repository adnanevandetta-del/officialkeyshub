import Image from "next/image";
import Link from "next/link";
import { getAllBlogListItems } from "../lib/blog-mdx";
import { themeFor } from "../blog/article-parts";

// Homepage strip of the newest guides plus the end-of-support tracker. Gives
// Google (and shoppers) direct links from the homepage to fresh articles, which
// helps new pages get crawled instead of sitting in "Discovered – not indexed".
export default function LatestGuides() {
  const posts = getAllBlogListItems().slice(0, 6);
  if (!posts.length) return null;
  return (
    <section aria-labelledby="latest-guides" className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-sky-700 mb-1">Guides &amp; answers</p>
            <h2 id="latest-guides" className="text-3xl md:text-4xl font-extrabold text-gray-900">Latest from the blog</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/microsoft-end-of-support"
              className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800 ring-1 ring-amber-200 hover:bg-amber-100"
            >
              <i className="fas fa-calendar-xmark" /> End-of-support dates
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-bold text-white hover:bg-gray-800">
              All guides <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((a) => {
            const t = themeFor(a.category);
            return (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className={`shrink-0 w-20 h-24 rounded-xl bg-gradient-to-br ${t.band} flex items-center justify-center`}>
                  <Image src={a.image} alt="" width={564} height={780} unoptimized className="h-20 w-auto object-contain drop-shadow" />
                </div>
                <div className="min-w-0">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${t.chip}`}>{a.category}</span>
                  <p className="mt-1.5 font-bold text-gray-900 leading-snug group-hover:text-sky-700">{a.title}</p>
                  <p className="mt-1 text-xs text-gray-500">{a.readTime} read</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
