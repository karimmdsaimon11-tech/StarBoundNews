import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'contact';

    if (type === 'ad') {
      const inquiries = await prisma.adInquiry.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ inquiries });
    }

    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ inquiries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const type = data.type || 'contact';

    if (type === 'ad') {
      if (!data.companyName || !data.contactPerson || !data.email || !data.message) {
        return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
      }

      const inquiry = await prisma.adInquiry.create({
        data: {
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          email: data.email,
          phone: data.phone,
          budget: data.budget,
          placement: data.placement,
          message: data.message,
        },
      });

      return NextResponse.json({ inquiry }, { status: 201 });
    }

    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ error: 'Name, email, subject, and message are required' }, { status: 400 });
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    });

    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, isRead, type } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    if (type === 'ad') {
      const inquiry = await prisma.adInquiry.update({
        where: { id },
        data: { isRead },
      });
      return NextResponse.json({ inquiry });
    }

    const inquiry = await prisma.contactInquiry.update({
      where: { id },
      data: { isRead },
    });
    return NextResponse.json({ inquiry });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type') || 'contact';

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    if (type === 'ad') {
      await prisma.adInquiry.delete({ where: { id } });
    } else {
      await prisma.contactInquiry.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

