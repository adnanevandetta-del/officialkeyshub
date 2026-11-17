import { staticBlogPosts } from "../lib/blog-static";

const SITE = "https://www.officialkeyshub.com";

// Article structured data (JSON-LD) for a hand-written blog post. Title,
// summary and date come from the /blog listing (app/lib/blog-static.ts), so
// they stay in sync with what readers see.
export default function ArticleSchema({ slug }: { slug: string }) {
  const post = staticBlogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  const parsed = new Date(post.date);
  const date = Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
  const url = `${SITE}/blog/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE}/og/blog/${slug}.jpg`,
    ...(date ? { datePublished: date, dateModified: date } : {}),
    author: { "@type": "Organization", name: "Official Keys Hub", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "Official Keys Hub",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
