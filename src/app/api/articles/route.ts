import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseSessionToken } from '@/lib/auth';
import { generateSlug } from '@/lib/constants';
import { ArticleStatus } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const district = searchParams.get('district');
    const author = searchParams.get('author');
    const status = searchParams.get('status') as ArticleStatus | null;
    const isHero = searchParams.get('isHero') === 'true';
    const isFeatured = searchParams.get('isFeatured') === 'true';
    const isTrending = searchParams.get('isTrending') === 'true';
    const isBreaking = searchParams.get('isBreaking') === 'true';
    const isOpinion = searchParams.get('isOpinion') === 'true';
    const q = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const where: any = {};

    // Public vs Admin filter
    if (status) {
      where.status = status;
    } else {
      // Default to PUBLISHED for public requests unless specified
      where.status = ArticleStatus.PUBLISHED;
    }

    if (category) {
      where.category = { slug: category };
    }

    if (district) {
      where.district = { slug: district };
    }

    if (author) {
      where.author = { slug: author };
    }

    if (isHero) where.isHero = true;
    if (isFeatured) where.isFeatured = true;
    if (isTrending) where.isTrending = true;
    if (isBreaking) where.isBreaking = true;
    if (isOpinion) where.isOpinion = true;

    if (q) {
      where.OR = [
        { title: { contains: q } },
        { titleBn: { contains: q } },
        { excerpt: { contains: q } },
        { content: { contains: q } },
        { tags: { contains: q } },
      ];
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { publishedAt: 'desc' },
        include: {
          category: true,
          subcategory: true,
          author: true,
          district: true,
        },
      }),
      prisma.article.count({ where }),
    ]);

    return NextResponse.json({
      articles,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('statbound_session')?.value;
    const session = token ? parseSessionToken(token) : null;

    const data = await req.json();

    if (!data.title || !data.content || !data.categoryId) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }

    // Auto slug from title if not given
    const baseSlug = data.slug
      ? data.slug
      : data.title
          .toLowerCase()
          .replace(/[^\w\u0980-\u09FF\s-]/g, '')
          .replace(/\s+/g, '-')
          .slice(0, 80);

    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    // Fallback author if not passed
    let authorId = data.authorId;
    if (!authorId) {
      const defaultAuthor = await prisma.author.findFirst();
      authorId = defaultAuthor?.id;
    }

    const status = data.status || ArticleStatus.PUBLISHED;
    const publishedAt = status === ArticleStatus.PUBLISHED ? new Date() : (data.publishedAt ? new Date(data.publishedAt) : null);

    const article = await prisma.article.create({
      data: {
        title: data.title,
        titleBn: data.titleBn || data.title,
        slug,
        subtitle: data.subtitle,
        excerpt: data.excerpt || data.title,
        content: data.content,
        featuredImage: data.featuredImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
        imageCaption: data.imageCaption,
        photographerCredit: data.photographerCredit,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId || null,
        authorId: authorId!,
        districtId: data.districtId || null,
        tags: data.tags || '',
        status,
        isHero: Boolean(data.isHero),
        isFeatured: Boolean(data.isFeatured),
        isTrending: Boolean(data.isTrending),
        isBreaking: Boolean(data.isBreaking),
        isOpinion: Boolean(data.isOpinion),
        readTimeMinutes: Math.max(1, Math.ceil((data.content?.length || 500) / 500)),
        seoTitle: data.seoTitle || `${data.title} | StatBound News`,
        seoDescription: data.seoDescription || data.excerpt,
        focusKeyword: data.focusKeyword,
        canonicalUrl: data.canonicalUrl,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        publishedAt,
        versions: {
          create: {
            version: 1,
            title: data.title,
            content: data.content,
            editorName: session?.name || 'Editor',
          },
        },
      },
      include: {
        category: true,
        author: true,
      },
    });

    // If breaking is set, also create breaking news ticker entry
    if (data.isBreaking && status === ArticleStatus.PUBLISHED) {
      await prisma.breakingNews.create({
        data: {
          headline: article.title,
          headlineBn: article.titleBn || article.title,
          url: `/news/${article.slug}`,
          articleId: article.id,
          isActive: true,
        },
      }).catch(() => {});
    }

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: session?.id,
        userName: session?.name || 'Staff',
        action: 'ARTICLE_CREATE',
        details: `Article created: ${article.title} (Status: ${article.status})`,
      },
    }).catch(() => {});

    return NextResponse.json({ article }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
