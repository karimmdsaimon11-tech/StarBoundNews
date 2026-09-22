import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json({ logs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, userName, action, details, ipAddress } = body;

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    const log = await prisma.auditLog.create({
      data: {
        userId: userId || null,
        userName: userName || 'System',
        action,
        details: details ? JSON.stringify(details) : null,
        ipAddress: ipAddress || '127.0.0.1',
      },
    });

    return NextResponse.json({ log });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create audit log' }, { status: 500 });
  }
}
