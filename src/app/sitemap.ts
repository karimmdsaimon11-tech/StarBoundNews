import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { SITE_URL, MAIN_CATEGORIES } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/latest-news`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/today`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/video`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/photo-gallery`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Add Categories
  for (const cat of MAIN_CATEGORIES) {
    routes.push({
      url: `${SITE_URL}/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.85,
    });
  }

  // Add Articles
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      take: 100,
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, updatedAt: true },
    });

    for (const art of articles) {
      routes.push({
        url: `${SITE_URL}/news/${art.slug}`,
        lastModified: art.updatedAt,
        changeFrequency: 'daily',
        priority: 0.7,
      });
    }
  } catch {}

  return routes;
}
