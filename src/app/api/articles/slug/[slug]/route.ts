import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ArticleStatus } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
        subcategory: true,
        author: true,
        district: true,
        opinionAuthor: true,
        comments: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Increment view count asynchronously
    await prisma.article.update({
      where: { id: article.id },
      data: { viewsCount: { increment: 1 } },
    }).catch(() => {});

    // Fetch related articles from same category
    const related = await prisma.article.findMany({
      where: {
        categoryId: article.categoryId,
        id: { not: article.id },
        status: ArticleStatus.PUBLISHED,
      },
      take: 4,
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
        author: true,
      },
    });

    return NextResponse.json({ article, related });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
