import { MetadataRoute } from 'next';
import { canonicalProducts } from './lib/catalog';
import { getMdxListItems } from './lib/blog-mdx';
import { staticBlogPosts } from './lib/blog-static';

// Fixed date (bump it when content really changes) — a lastmod that changes on every
// deploy teaches Google to ignore the field.
const LAST_UPDATED = new Date('2026-11-17');

export default function sitemap(): MetadataRoute.Sitemap {
  // Production domain — www is the live host (the apex domain redirects to it),
  // so every URL in the sitemap must use www to match the canonical tags.
  const baseUrl = 'https://www.officialkeyshub.com';

  const productPages: MetadataRoute.Sitemap = canonicalProducts.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Hand-written blog articles — generated from the same list that powers /blog,
  // so a new article can never be missing from the sitemap again.
  const staticBlogPages: MetadataRoute.Sitemap = staticBlogPosts.map((a) => {
    const parsed = new Date(a.date);
    return {
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? LAST_UPDATED : parsed,
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  // Auto-generated (published) MDX blog articles.
  const mdxBlogPages: MetadataRoute.Sitemap = getMdxListItems().map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : LAST_UPDATED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/products`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...productPages,
    ...staticBlogPages,
    ...mdxBlogPages,
    // Homepage
    {
      url: baseUrl,
      lastModified: LAST_UPDATED,
      changeFrequency: 'daily',
      priority: 1,
    },
    // Main Pages
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/key-finder`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/activation-guide`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/setup-guide`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/what-you-get`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/partner-program`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Legal Pages
    {
      url: `${baseUrl}/licensing`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/payment-methods`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
