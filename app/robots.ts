import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.officialkeyshub.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Only block true non-content endpoints here. Account/checkout pages are
        // deliberately kept crawlable so Googlebot can read their `noindex` meta
        // tag and drop them cleanly — blocking them in robots.txt would hide the
        // noindex and cause "Indexed, though blocked by robots.txt" warnings.
        // /_next/ is intentionally NOT disallowed, so CSS/JS stay fetchable.
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        // AI search & answer engines — explicitly welcome so the store can be
        // found and cited in ChatGPT, Perplexity, Claude, Gemini, Copilot and
        // Apple Intelligence answers. /llms.txt summarises the site for them.
        userAgent: [
          'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
          'PerplexityBot', 'Perplexity-User',
          'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
          'Google-Extended', 'Applebot', 'Applebot-Extended',
          'Amazonbot', 'DuckAssistBot', 'MistralAI-User', 'CCBot',
        ],
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
