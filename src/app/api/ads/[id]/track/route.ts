import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { type } = await req.json();

    if (type === 'click') {
      await prisma.advertisement.update({
        where: { id: params.id },
        data: { clicksCount: { increment: 1 } },
      });
    } else {
      await prisma.advertisement.update({
        where: { id: params.id },
        data: { impressionsCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
