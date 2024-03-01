import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog', '/sitemap.xml'],
    },
    sitemap: 'https://www.btg-communication.fr/sitemap.xml',
  };
}
