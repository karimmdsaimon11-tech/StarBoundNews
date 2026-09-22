import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    });
    return NextResponse.json({ subscribers });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { status: 'ACTIVE' },
      create: {
        email: email.toLowerCase().trim(),
        name: name || null,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({ subscriber }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ subscriber });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.newsletterSubscriber.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

