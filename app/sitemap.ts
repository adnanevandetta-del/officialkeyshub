import { MetadataRoute } from 'next';
import { allProducts } from './lib/catalog';

// Fixed date (bump it when content really changes) — a lastmod that changes on every
// deploy teaches Google to ignore the field.
const LAST_UPDATED = new Date('2026-09-19');

export default function sitemap(): MetadataRoute.Sitemap {
  // Production domain — must match the host that serves 200 (www), so sitemap
  // URLs don't 307-redirect to www and get flagged as "incorrect pages".
  const baseUrl = 'https://www.officialkeyshub.com';

  const productPages: MetadataRoute.Sitemap = allProducts.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: LAST_UPDATED,
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
    // Blog Articles - Buying Guides (high-intent keywords)
    {
      url: `${baseUrl}/blog/buy-microsoft-retail-keys-safe`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog/activate-windows-11-key`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog/buy-genuine-microsoft-office-key-cheap`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog/cheap-windows-11-keys-2026`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog/buy-cheap-microsoft-office-keys-2026`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog/transfer-windows-license-new-pc`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Blog Articles - Windows Activation & Guides
    {
      url: `${baseUrl}/blog/how-to-activate-windows-11`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog/how-to-activate-office-2021`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog/windows-11-home-vs-pro`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog/windows-11-vs-windows-10-comparison`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    // Blog Articles - Licensing & Legal
    {
      url: `${baseUrl}/blog/oem-vs-retail-windows-keys`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/is-buying-windows-keys-legal`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/cheap-windows-keys-safe`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Blog Articles - Office
    {
      url: `${baseUrl}/blog/office-2021-vs-office-365`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
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
  ];
}
