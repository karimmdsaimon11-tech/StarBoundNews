import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/constants';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      take: 30,
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
        author: true,
      },
    });

    const itemsXml = articles
      .map((a) => {
        const title = a.titleBn || a.title;
        const link = `${SITE_URL}/news/${a.slug}`;
        const pubDate = a.publishedAt ? new Date(a.publishedAt).toUTCString() : new Date().toUTCString();
        const author = a.author?.nameBn || a.author?.name || 'StatBound News';
        const category = a.category?.nameBn || a.category?.name || 'General';

        return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${a.excerpt}]]></description>
      <category><![CDATA[${category}]]></category>
      <author><![CDATA[${author}]]></author>
      <pubDate>${pubDate}</pubDate>
      ${a.featuredImage ? `<enclosure url="${a.featuredImage}" type="image/jpeg" />` : ''}
    </item>`;
      })
      .join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_TAGLINE}</description>
    <language>bn-BD</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error: any) {
    return new NextResponse('Error generating RSS', { status: 500 });
  }
}
