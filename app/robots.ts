import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.officialkeyshub.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Note: /_next/ is intentionally NOT disallowed — blocking it stops
        // crawlers from fetching the site's CSS/JS (flagged as blocked resources).
        disallow: ['/api/', '/admin/', '/private/', '/checkout/', '/orders/', '/profile/', '/login/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/checkout/', '/orders/', '/profile/', '/login/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/checkout/', '/orders/', '/profile/', '/login/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
