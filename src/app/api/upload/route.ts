import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const caption = formData.get('caption') as string | null;
    const photographerCredit = formData.get('photographerCredit') as string | null;
    const altText = formData.get('altText') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate mime type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a valid image (JPEG, PNG, WebP, GIF, SVG).' },
        { status: 400 }
      );
    }

    // Check size limit (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 15MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique safe filename
    const ext = path.extname(file.name) || '.jpg';
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_\u0980-\u09FF-]/g, '_');
    const uniqueFilename = `${Date.now()}-${baseName}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    // Save to filesystem
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;

    // Store in Prisma Media Library
    const mediaItem = await prisma.media.create({
      data: {
        url: publicUrl,
        filename: uniqueFilename,
        mimeType: file.type,
        sizeBytes: file.size,
        width: 1200,
        height: 675,
        altText: altText || baseName,
        caption: caption || null,
        photographerCredit: photographerCredit || 'StatBound Media',
      },
    }).catch(() => null);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      media: mediaItem,
    });
  } catch (error: any) {
    console.error('Error in file upload:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
