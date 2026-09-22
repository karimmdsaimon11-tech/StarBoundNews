import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseSessionToken, createSessionToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('statbound_session')?.value;
    const authUser = token ? parseSessionToken(token) : null;
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
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
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('statbound_session')?.value;
    const authUser = sessionCookie ? parseSessionToken(sessionCookie) : null;
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, bio, avatar, newEmail, currentPassword, newPassword } = body;

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updateData: any = {};

    // 1. Basic profile updates
    if (name) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;

    // 2. Email Change (optional)
    if (newEmail && newEmail.toLowerCase().trim() !== user.email.toLowerCase()) {
      const emailNormalized = newEmail.toLowerCase().trim();
      const existingUser = await prisma.user.findUnique({
        where: { email: emailNormalized },
      });
      if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json({ error: 'এই ইমেইলটি ইতিমধ্যে অন্য একটি একাউন্টে ব্যবহৃত হচ্ছে।' }, { status: 400 });
      }
      updateData.email = emailNormalized;
    }

    // 3. Password Change (optional)
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' }, { status: 400 });
      }
      // Update password (demo hash / string)
      updateData.passwordHash = newPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
      },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userName: updatedUser.name,
        action: 'PROFILE_UPDATED',
        details: JSON.stringify({
          emailChanged: Boolean(newEmail && newEmail !== user.email),
          passwordChanged: Boolean(newPassword),
        }),
      },
    }).catch(() => {});

    // Create updated session token
    const token = createSessionToken(updatedUser);

    const response = NextResponse.json({
      success: true,
      message: 'প্রোফাইল ও নিরাপত্তা সেটিংস সফলভাবে আপডেট হয়েছে!',
      user: updatedUser,
    });

    response.cookies.set('statbound_session', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
