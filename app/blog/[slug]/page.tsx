import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { getMdxArticle, getMdxSlugs } from "../../lib/blog-mdx";
import { mdxComponents } from "../mdx-components";

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
    title: `${data.title} | Official Keys Hub`,
    description: data.description ?? data.excerpt,
    keywords: data.keywords,
    alternates: { canonical: url },
    robots: data.draft ? { index: false, follow: true } : undefined,
    openGraph: {
      title: data.title,
      description: data.description ?? data.excerpt,
      url,
      type: "article",
      images: data.image ? [{ url: data.image }] : undefined,
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

  const dateLabel = data.date
    ? new Date(data.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description ?? data.excerpt,
    image: data.image,
    datePublished: data.date,
    dateModified: data.date,
    author: { "@type": "Organization", name: "Official Keys Hub" },
    publisher: {
      "@type": "Organization",
      name: "Official Keys Hub",
      logo: { "@type": "ImageObject", url: `${SITE}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: data.title },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <div className="pt-20 bg-white min-h-screen">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {data.category && (
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                    {data.category}
                  </span>
                )}
                <span className="text-gray-500 text-sm">
                  {dateLabel && <>📅 {dateLabel}</>} {data.readTime && <>• ⏱️ {data.readTime} read</>}
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
              {data.image && (
                <div className="relative w-full h-56 md:h-80 rounded-2xl overflow-hidden mb-10">
                  <Image src={data.image} alt={data.title} fill unoptimized className="object-cover" priority />
                </div>
              )}
              <MDXRemote source={content} components={mdxComponents} />

              {/* CTA */}
              <div className="mt-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
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
      <Footer />
    </>
  );
}
