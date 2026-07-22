import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.yonkoservicios.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/administracion-yonko-gerald', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
