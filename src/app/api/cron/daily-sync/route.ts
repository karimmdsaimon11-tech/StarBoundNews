import { NextRequest, NextResponse } from 'next/server';
import { ensureDailyNewsFresh } from '@/lib/dailyNewsSync';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const force = searchParams.get('force') === 'true';

  const result = await ensureDailyNewsFresh(force);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const force = Boolean(body.force);
    const result = await ensureDailyNewsFresh(force);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
