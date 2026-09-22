import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            nameBn: true,
            designation: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, bio, password } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (existing) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        role: role || 'REPORTER',
        passwordHash: password && password.length >= 6 ? password : 'admin',
        bio: bio || null,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, role, bio, password } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updateData: any = {
      name,
      role,
      bio,
    };
    if (email) updateData.email = email.toLowerCase().trim();
    if (password && password.length >= 6) updateData.passwordHash = password;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
