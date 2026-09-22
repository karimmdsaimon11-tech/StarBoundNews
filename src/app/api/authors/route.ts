import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const author = await prisma.author.findUnique({
        where: { slug },
        include: {
          articles: {
            where: { status: 'PUBLISHED' },
            orderBy: { publishedAt: 'desc' },
            include: { category: true },
          },
        },
      });

      if (!author) {
        return NextResponse.json({ error: 'Author not found' }, { status: 404 });
      }

      return NextResponse.json({ author });
    }

    const authors = await prisma.author.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    return NextResponse.json({ authors });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');

    const author = await prisma.author.create({
      data: {
        name: data.name,
        nameBn: data.nameBn || data.name,
        slug,
        email: data.email,
        designation: data.designation || 'Staff Reporter',
        designationBn: data.designationBn || 'স্টাফ রিপোর্টার',
        avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        bio: data.bio,
        bioBn: data.bioBn,
        facebook: data.facebook,
        twitter: data.twitter,
        linkedin: data.linkedin,
      },
    });

    return NextResponse.json({ author }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
