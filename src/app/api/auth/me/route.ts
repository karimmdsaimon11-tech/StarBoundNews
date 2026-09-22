import { NextRequest, NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('statbound_session')?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = parseSessionToken(token);
  return NextResponse.json({ user }, { status: 200 });
}
