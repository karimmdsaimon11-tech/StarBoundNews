import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseSessionToken } from '@/lib/auth';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('statbound_session')?.value;
    const session = token ? parseSessionToken(token) : null;

    const data = await req.json();

    if (!data.name || !data.nameBn) {
      return NextResponse.json({ error: 'Name in English and Bengali is required' }, { status: 400 });
    }

    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');

    const category = await prisma.category.create({
      data: {
        name: data.name,
        nameBn: data.nameBn,
        slug,
        description: data.description,
        order: parseInt(data.order || '0', 10),
        color: data.color || '#1E3E62',
        isNav: data.isNav !== undefined ? Boolean(data.isNav) : true,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
