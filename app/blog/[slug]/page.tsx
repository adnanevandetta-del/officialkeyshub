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
import { getMdxArticle, getMdxSlugs, mdxImage, getAllBlogListItems } from "../../lib/blog-mdx";
import ArticleHero from "../ArticleHero";
import { mdxComponents } from "../mdx-components";
import { BlogShopStrip, ProductAd } from "../BlogAds";
import ReadingProgress from "../ReadingProgress";
import {
  tocFromMdx,
  themeFor,
  TableOfContents,
  SidebarProduct,
  SupportEndingSoon,
  KeyFinderNudge,
  RelatedArticles,
} from "../article-parts";

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

  const toc = tocFromMdx(content);
  const theme = themeFor(data.category);
  const productName = data.product ?? "Windows 11 Pro";
  const others = getAllBlogListItems().filter((a) => a.slug !== slug);
  const related = [
    ...others.filter((a) => a.category === data.category),
    ...others.filter((a) => a.category !== data.category),
  ].slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <ReadingProgress />
      <Navbar />
      <div className="bg-white min-h-screen">
        {/* Hero: category-tinted band, title on the left, the product box on the right */}
        <section className={`bg-gradient-to-br ${theme.band} border-b border-gray-100`}>
          <div className="max-w-6xl mx-auto px-4 pt-5 pb-10 md:pb-14">
            <Breadcrumb items={breadcrumbItems} />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] items-center">
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {data.category && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${theme.chip}`}>
                      <i className={`fas ${theme.icon} text-xs`} /> {data.category}
                    </span>
                  )}
                  {data.readTime && <span className="text-sm text-gray-500"><i className="far fa-clock mr-1" />{data.readTime} read</span>}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-5 text-gray-900 leading-tight">{data.title}</h1>
                {(data.description ?? data.excerpt) && (
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">{data.description ?? data.excerpt}</p>
                )}
                <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                  <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full ring-1 ring-gray-200 bg-white" />
                  <div>
                    <p className="font-semibold text-gray-900 m-0">Official Keys Hub team</p>
                    <p className="m-0 text-gray-500">
                      {dateLabel && <>Published {dateLabel}</>}
                      {updatedLabel && <> · Updated {updatedLabel}</>}
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                {data.image ? (
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={data.image} alt={data.title} fill unoptimized className="object-cover" priority />
                  </div>
                ) : (
                  <ArticleHero products={[productName]} alt={`${productName} product box`} className="m-0" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Body + sidebar */}
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="min-w-0 max-w-3xl">
            {data.summary && (
              <aside className="mb-8 rounded-2xl border border-sky-200 bg-sky-50 p-6" aria-label="Quick answer">
                <p className="text-xs font-bold uppercase tracking-wide text-sky-700 mb-2">
                  <i className="fas fa-bolt mr-1" /> Quick answer
                </p>
                <p className="text-gray-800 leading-relaxed m-0">{data.summary}</p>
              </aside>
            )}

            {toc.length >= 3 && (
              <details className="lg:hidden mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <summary className="cursor-pointer font-bold text-gray-900">On this page ({toc.length} sections)</summary>
                <TableOfContents items={toc} className="mt-4" />
              </details>
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

            <RelatedArticles items={related} />
          </article>

          <aside className="hidden lg:block" aria-label="Article sidebar">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
              <TableOfContents items={toc} />
              <SidebarProduct name={data.product} topic={adTopic} />
              <SupportEndingSoon />
              <KeyFinderNudge />
            </div>
          </aside>
        </div>
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
