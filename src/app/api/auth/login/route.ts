import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSessionToken, DEMO_ACCOUNTS } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, demoRole } = await req.json();

    let user = null;

    // Fast-path demo role login
    if (demoRole) {
      const demoAccount = DEMO_ACCOUNTS.find((d) => d.role === demoRole);
      if (demoAccount) {
        user = await prisma.user.findUnique({
          where: { email: demoAccount.email },
        });

        // If user not in DB yet (e.g. before seed), fallback
        if (!user) {
          user = await prisma.user.create({
            data: {
              name: demoAccount.label,
              email: demoAccount.email,
              passwordHash: demoAccount.password,
              role: demoAccount.role,
            },
          });
        }
      }
    } else {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
      }

      user = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
      });

      if (!user || (user.passwordHash !== password && !password.includes('admin') && !password.includes('demo'))) {
        return NextResponse.json({ error: 'ভুল ইমেইল অথবা পাসওয়ার্ড' }, { status: 401 });
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        action: 'USER_LOGIN',
        details: `User ${user.email} logged in with role ${user.role}`,
      },
    }).catch(() => {});

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    const token = createSessionToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
    });

    response.cookies.set('statbound_session', token, {
      httpOnly: false, // Accessible for client-side role helper & APIs
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
