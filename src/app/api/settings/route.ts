import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    // Return as array and map
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({ settings, map: settingsMap });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { settings } = body; // object of key-value pairs

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Settings object is required' }, { status: 400 });
    }

    const updates = Object.entries(settings).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value), group: 'GENERAL' },
      })
    );

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
