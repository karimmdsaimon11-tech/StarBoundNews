import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const galleries = await prisma.photoGallery.findMany({
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json({ galleries });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch photo galleries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, titleBn, slug, description, coverImage, photographerCredit, images } = body;

    if (!title || !slug || !coverImage) {
      return NextResponse.json({ error: 'Title, slug, and cover image are required' }, { status: 400 });
    }

    const gallery = await prisma.photoGallery.create({
      data: {
        title,
        titleBn: titleBn || title,
        slug,
        description: description || null,
        coverImage,
        photographerCredit: photographerCredit || 'StatBound Photo Desk',
        publishedAt: new Date(),
        images: images && images.length > 0 ? {
          create: images.map((img: any, index: number) => ({
            imageUrl: img.imageUrl,
            caption: img.caption || null,
            photographerCredit: img.photographerCredit || photographerCredit || 'StatBound Desk',
            order: img.order !== undefined ? img.order : index,
          })),
        } : undefined,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ gallery });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create photo gallery' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.photoGallery.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photo gallery' }, { status: 500 });
  }
}
