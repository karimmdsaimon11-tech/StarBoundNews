import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseSessionToken } from '@/lib/auth';
import { ArticleStatus } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        subcategory: true,
        author: true,
        district: true,
        versions: { orderBy: { version: 'desc' } },
        comments: { where: { status: 'APPROVED' }, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.cookies.get('statbound_session')?.value;
    const session = token ? parseSessionToken(token) : null;

    const data = await req.json();

    const existing = await prisma.article.findUnique({
      where: { id: params.id },
      include: { versions: { orderBy: { version: 'desc' }, take: 1 } },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const nextVersion = (existing.versions[0]?.version || 1) + 1;

    const updated = await prisma.article.update({
      where: { id: params.id },
      data: {
        title: data.title !== undefined ? data.title : existing.title,
        titleBn: data.titleBn !== undefined ? data.titleBn : existing.titleBn,
        subtitle: data.subtitle !== undefined ? data.subtitle : existing.subtitle,
        excerpt: data.excerpt !== undefined ? data.excerpt : existing.excerpt,
        content: data.content !== undefined ? data.content : existing.content,
        featuredImage: data.featuredImage !== undefined ? data.featuredImage : existing.featuredImage,
        imageCaption: data.imageCaption !== undefined ? data.imageCaption : existing.imageCaption,
        photographerCredit: data.photographerCredit !== undefined ? data.photographerCredit : existing.photographerCredit,
        categoryId: data.categoryId !== undefined ? data.categoryId : existing.categoryId,
        subcategoryId: data.subcategoryId !== undefined ? data.subcategoryId : existing.subcategoryId,
        authorId: data.authorId !== undefined ? data.authorId : existing.authorId,
        districtId: data.districtId !== undefined ? data.districtId : existing.districtId,
        tags: data.tags !== undefined ? data.tags : existing.tags,
        status: data.status !== undefined ? data.status : existing.status,
        isHero: data.isHero !== undefined ? Boolean(data.isHero) : existing.isHero,
        isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : existing.isFeatured,
        isTrending: data.isTrending !== undefined ? Boolean(data.isTrending) : existing.isTrending,
        isBreaking: data.isBreaking !== undefined ? Boolean(data.isBreaking) : existing.isBreaking,
        isOpinion: data.isOpinion !== undefined ? Boolean(data.isOpinion) : existing.isOpinion,
        seoTitle: data.seoTitle !== undefined ? data.seoTitle : existing.seoTitle,
        seoDescription: data.seoDescription !== undefined ? data.seoDescription : existing.seoDescription,
        focusKeyword: data.focusKeyword !== undefined ? data.focusKeyword : existing.focusKeyword,
        canonicalUrl: data.canonicalUrl !== undefined ? data.canonicalUrl : existing.canonicalUrl,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : existing.scheduledAt,
        publishedAt: data.status === ArticleStatus.PUBLISHED && !existing.publishedAt ? new Date() : existing.publishedAt,
        versions: data.content && data.content !== existing.content ? {
          create: {
            version: nextVersion,
            title: data.title || existing.title,
            content: data.content,
            editorName: session?.name || 'Editor',
          },
        } : undefined,
      },
      include: {
        category: true,
        author: true,
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: session?.id,
        userName: session?.name || 'Staff',
        action: 'ARTICLE_UPDATE',
        details: `Updated article ID: ${updated.id} (${updated.title})`,
      },
    }).catch(() => {});

    return NextResponse.json({ article: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.cookies.get('statbound_session')?.value;
    const session = token ? parseSessionToken(token) : null;

    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    await prisma.article.delete({
      where: { id: params.id },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: session?.id,
        userName: session?.name || 'Staff',
        action: 'ARTICLE_DELETE',
        details: `Deleted article: ${article.title}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
