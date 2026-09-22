import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CommentStatus } from '@/types';
import { parseSessionToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as CommentStatus | null;
    const articleId = searchParams.get('articleId');

    const where: any = {};
    if (status) where.status = status;
    if (articleId) where.articleId = articleId;

    const comments = await prisma.comment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        article: {
          select: { id: true, title: true, slug: true },
        },
      },
    });

    return NextResponse.json({ comments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { articleId, name, email, content } = await req.json();

    if (!articleId || !name || !email || !content) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        articleId,
        name: name.trim(),
        email: email.trim(),
        content: content.trim(),
        status: CommentStatus.PENDING, // Moderation queue
      },
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('statbound_session')?.value;
    const session = token ? parseSessionToken(token) : null;

    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and Status are required' }, { status: 400 });
    }

    const comment = await prisma.comment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ comment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
