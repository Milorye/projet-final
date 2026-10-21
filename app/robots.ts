import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/panier', '/favoris'],
    },
    sitemap: 'https://maison-moya.vercel.app/sitemap.xml',
  };
}
