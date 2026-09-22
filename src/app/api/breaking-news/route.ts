import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseSessionToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    const items = await prisma.breakingNews.findMany({
      where: all ? {} : { isActive: true },
      orderBy: { priority: 'asc' },
    });

    return NextResponse.json({ items });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('statbound_session')?.value;
    const session = token ? parseSessionToken(token) : null;

    const data = await req.json();

    if (!data.headline) {
      return NextResponse.json({ error: 'Headline is required' }, { status: 400 });
    }

    const item = await prisma.breakingNews.create({
      data: {
        headline: data.headline,
        headlineBn: data.headlineBn || data.headline,
        url: data.url || null,
        articleId: data.articleId || null,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
        priority: parseInt(data.priority || '1', 10),
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: session?.id,
        userName: session?.name || 'Staff',
        action: 'BREAKING_NEWS_CREATE',
        details: `Created breaking news: ${item.headline}`,
      },
    }).catch(() => {});

    return NextResponse.json({ item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const item = await prisma.breakingNews.update({
      where: { id: data.id },
      data: {
        headline: data.headline,
        headlineBn: data.headlineBn,
        url: data.url,
        isActive: data.isActive,
        priority: data.priority ? parseInt(data.priority, 10) : undefined,
      },
    });

    return NextResponse.json({ item });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.breakingNews.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
