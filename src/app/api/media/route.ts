import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const where: any = {};
    if (query) {
      where.OR = [
        { filename: { contains: query } },
        { caption: { contains: query } },
        { altText: { contains: query } },
        { photographerCredit: { contains: query } },
      ];
    }

    const items = await prisma.media.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media assets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, filename, mimeType, sizeBytes, width, height, altText, caption, photographerCredit } = body;

    if (!url || !filename) {
      return NextResponse.json({ error: 'URL and filename are required' }, { status: 400 });
    }

    const media = await prisma.media.create({
      data: {
        url,
        filename,
        mimeType: mimeType || 'image/jpeg',
        sizeBytes: sizeBytes || 102400,
        width: width || 1200,
        height: height || 675,
        altText: altText || filename,
        caption: caption || null,
        photographerCredit: photographerCredit || 'StatBound Desk',
      },
    });

    return NextResponse.json({ media });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save media' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.media.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
