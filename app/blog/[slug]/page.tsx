import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

// GFM adds markdown tables, strikethrough and autolinks to MDX articles.
const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } };
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { getMdxArticle, getMdxSlugs, mdxImage } from "../../lib/blog-mdx";
import ArticleHero from "../ArticleHero";
import { mdxComponents } from "../mdx-components";
import { BlogShopStrip, ProductAd } from "../BlogAds";

const SITE = "https://www.officialkeyshub.com";

// Hand-written .tsx article folders take route priority; this dynamic segment
// only serves auto-generated MDX slugs, and 404s for anything else.
export const dynamicParams = false;

export function generateStaticParams() {
  return getMdxSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getMdxArticle(slug);
  if (!article) return { title: "Article Not Found | Official Keys Hub" };
  const { data } = article;
  const url = `${SITE}/blog/${slug}`;
  return {
    // Brand suffix only when the full title still fits in ~60 characters.
    title: data.title.length <= 40 ? `${data.title} | Official Keys Hub` : data.title,
    description: data.description ?? data.excerpt,
    keywords: data.keywords,
    alternates: { canonical: url },
    robots: data.draft ? { index: false, follow: true } : undefined,
    openGraph: {
      title: data.title,
      description: data.description ?? data.excerpt,
      url,
      type: "article",
      // Social cards need a raster image: a custom image, else the site card.
      images: [{ url: data.image ?? `${SITE}/og-image.jpg`, width: data.image ? undefined : 1200, height: data.image ? undefined : 630 }],
    },
  };
}

export default async function MdxBlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getMdxArticle(slug);
  if (!article) notFound();
  const { data, content } = article;
  const url = `${SITE}/blog/${slug}`;
  const adTopic = `${slug} ${data.title} ${data.keywords ?? ""} ${data.product ?? ""}`;

  const fmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
  const dateLabel = fmt(data.date);
  const updatedLabel = data.updated && data.updated !== data.date ? fmt(data.updated) : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.summary ?? data.description ?? data.excerpt,
    image: data.image ?? `${SITE}${mdxImage(data)}`,
    datePublished: data.date,
    dateModified: data.updated ?? data.date,
    author: { "@type": "Organization", name: "Official Keys Hub", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "Official Keys Hub",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(data.keywords ? { keywords: data.keywords } : {}),
  };

  // FAQ structured data from the article's "## Frequently asked questions"
  // section (### question, then answer paragraphs). Answer engines read this to
  // lift exact Q&A pairs.
  const faqs = extractFaqs(content);
  const faqLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: data.title },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <Navbar />
      <div className="pt-20 bg-white min-h-screen">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <section className="py-12 md:py-16 bg-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {data.category && (
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                    {data.category}
                  </span>
                )}
                <span className="text-gray-500 text-sm">
                  {dateLabel && <>📅 {dateLabel}</>} {updatedLabel && <>• Updated {updatedLabel}</>}{" "}
                  {data.readTime && <>• ⏱️ {data.readTime} read</>}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-5 text-gray-900 leading-tight">
                {data.title}
              </h1>
              {(data.description ?? data.excerpt) && (
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {data.description ?? data.excerpt}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              {data.image ? (
                <div className="relative w-full h-56 md:h-80 rounded-2xl overflow-hidden mb-10">
                  <Image src={data.image} alt={data.title} fill unoptimized className="object-cover" priority />
                </div>
              ) : (
                <ArticleHero products={[data.product ?? "Windows 11 Pro"]} alt={`${data.product ?? "Windows 11 Pro"} product box`} className="mb-10" />
              )}
              {data.summary && (
                <aside className="mb-10 rounded-2xl border border-sky-200 bg-sky-50 p-6" aria-label="Quick answer">
                  <p className="text-xs font-bold uppercase tracking-wide text-sky-700 mb-2">Quick answer</p>
                  <p className="text-gray-800 leading-relaxed m-0">{data.summary}</p>
                </aside>
              )}
              {(() => {
                const [before, after] = splitForAd(content);
                return (
                  <>
                    <MDXRemote source={before} components={mdxComponents} options={mdxOptions} />
                    {after && (
                      <>
                        <ProductAd name={data.product} topic={adTopic} />
                        <MDXRemote source={after} components={mdxComponents} options={mdxOptions} />
                      </>
                    )}
                  </>
                );
              })()}

              {/* CTA */}
              <div className="mt-14 rounded-2xl p-8 text-center text-white bg-blue-700">
                <h2 className="text-2xl font-bold mb-3">Need a genuine key?</h2>
                <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                  Get genuine Microsoft licenses with instant delivery, a 30-day money-back guarantee, and 24/7 support.
                </p>
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all"
                >
                  Browse products
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
      <BlogShopStrip topic={adTopic} />
      <Footer />
    </>
  );
}

/**
 * Splits the article at a "## " heading roughly halfway through (never at or
 * after the FAQ) so a product ad can sit mid-article. Returns [whole, ""] for
 * short articles.
 */
function splitForAd(mdx: string): [string, string] {
  const heads = [...mdx.matchAll(/^##\s+(.+)$/gm)].filter(
    (m) => !/frequently asked|faqs?\s*$/i.test(m[1]),
  );
  if (heads.length < 3) return [mdx, ""];
  const at = heads[Math.floor(heads.length / 2)].index!;
  return [mdx.slice(0, at), mdx.slice(at)];
}

/** Q&A pairs from a "## Frequently asked questions" section (### question + answer text). */
function extractFaqs(mdx: string): { q: string; a: string }[] {
  const section = mdx.split(/^##\s+(?:frequently asked questions|faqs?)\s*$/im)[1];
  if (!section) return [];
  const body = section.split(/^##\s+/m)[0];
  return body
    .split(/^###\s+/m)
    .slice(1)
    .map((block) => {
      const [q, ...rest] = block.split("\n");
      const a = rest
        .join(" ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links -> text
        .replace(/[*_`>]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      return { q: q.trim(), a };
    })
    .filter((f) => f.q && f.a);
}
