import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AdPlacement } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const placement = searchParams.get('placement') as AdPlacement | null;
    const all = searchParams.get('all') === 'true';

    if (all) {
      const ads = await prisma.advertisement.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ ads });
    }

    if (placement) {
      const ad = await prisma.advertisement.findFirst({
        where: {
          placement,
          isActive: true,
        },
        orderBy: { priority: 'asc' },
      });

      return NextResponse.json({ ad });
    }

    const ads = await prisma.advertisement.findMany({
      where: { isActive: true },
      orderBy: { priority: 'asc' },
    });

    return NextResponse.json({ ads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name || !data.imageUrl || !data.targetUrl || !data.placement) {
      return NextResponse.json({ error: 'Name, image URL, target URL, and placement are required' }, { status: 400 });
    }

    const ad = await prisma.advertisement.create({
      data: {
        name: data.name,
        advertiser: data.advertiser || 'Direct Advertiser',
        imageUrl: data.imageUrl,
        targetUrl: data.targetUrl,
        placement: data.placement,
        deviceTargeting: data.deviceTargeting || 'ALL',
        priority: parseInt(data.priority || '1', 10),
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });

    return NextResponse.json({ ad }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.advertisement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
