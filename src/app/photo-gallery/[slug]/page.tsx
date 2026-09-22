import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdSlot from '@/components/ads/AdSlot';
import Link from 'next/link';
import { Camera, ChevronRight, Share2 } from 'lucide-react';
import { formatBanglaDateTime, toBanglaNumber } from '@/lib/date';
import ShareButtons from '@/components/common/ShareButtons';
import { SITE_URL } from '@/lib/constants';

interface PhotoGalleryDetailPageProps {
  params: { slug: string };
}

export default async function PhotoGalleryDetailPage({ params }: PhotoGalleryDetailPageProps) {
  const gallery = await prisma.photoGallery.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { order: 'asc' } },
    },
  }).catch(() => null);

  if (!gallery) notFound();

  const displayTitle = gallery.titleBn || gallery.title;
  const pageUrl = `${SITE_URL}/photo-gallery/${gallery.slug}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
          <Link href="/" className="hover:underline">প্রচ্ছদ</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/photo-gallery" className="hover:underline">ছবির গল্প</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-xs">{displayTitle}</span>
        </nav>

        {/* Gallery Header */}
        <div className="pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1 inline-block">
            ফটো ফিচার অ্যালবাম / PHOTO STORY
          </span>
          <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white leading-tight mb-3">
            {displayTitle}
          </h1>

          {gallery.description && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {gallery.description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span>প্রকাশ: {formatBanglaDateTime(gallery.publishedAt)}</span>
              {gallery.photographerCredit && (
                <span className="ml-3 font-semibold text-slate-700 dark:text-slate-300">
                  ছবি: {gallery.photographerCredit}
                </span>
              )}
            </div>

            <ShareButtons url={pageUrl} title={displayTitle} />
          </div>
        </div>

        {/* Photo Stack */}
        <div className="space-y-12 my-8">
          {gallery.images.map((img, index) => (
            <div
              key={img.id}
              className="bg-white dark:bg-darkbg-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-darkbg-border shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={img.imageUrl}
                  alt={img.caption || `Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900/60">
                <div className="flex items-start gap-3">
                  <span className="font-serif font-bold text-sm bg-newspaper-navy text-white px-2 py-0.5 rounded">
                    {toBanglaNumber(index + 1)} / {toBanglaNumber(gallery.images.length)}
                  </span>
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {img.caption || displayTitle}
                  </p>
                </div>

                {img.photographerCredit && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                    ছবি: {img.photographerCredit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <AdSlot placement="FOOTER" />
      </main>

      <Footer />
    </div>
  );
}
