import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const videos = await prisma.videoStory.findMany({
      include: {
        category: true,
      },
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json({ videos });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, titleBn, slug, description, videoUrl, thumbnailUrl, duration, categoryId, isFeatured } = body;

    if (!title || !slug || !videoUrl || !thumbnailUrl) {
      return NextResponse.json({ error: 'Title, slug, videoUrl, and thumbnailUrl are required' }, { status: 400 });
    }

    const video = await prisma.videoStory.create({
      data: {
        title,
        titleBn: titleBn || title,
        slug,
        description: description || null,
        videoUrl,
        thumbnailUrl,
        duration: duration || '03:45',
        categoryId: categoryId || null,
        isFeatured: Boolean(isFeatured),
        publishedAt: new Date(),
      },
    });

    return NextResponse.json({ video });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create video story' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, titleBn, slug, description, videoUrl, thumbnailUrl, duration, categoryId, isFeatured } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const video = await prisma.videoStory.update({
      where: { id },
      data: {
        title,
        titleBn,
        slug,
        description,
        videoUrl,
        thumbnailUrl,
        duration,
        categoryId: categoryId || null,
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json({ video });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.videoStory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}
