import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PhotoGalleryCard from '@/components/news/PhotoGalleryCard';
import AdSlot from '@/components/ads/AdSlot';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';

export const revalidate = 60;

export default async function PhotoGalleryIndexPage() {
  const galleries = await prisma.photoGallery.findMany({
    orderBy: { publishedAt: 'desc' },
    include: { images: true },
  }).catch(() => []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Header Banner */}
        <div className="pb-6 mb-8 border-b border-slate-200 dark:border-darkbg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">
              <Camera className="w-4 h-4" />
              <span>ছবির গল্প / PHOTO GALLERY</span>
            </div>
            <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
              ফটোগ্রাফি ও ভিজ্যুয়াল স্টোরিটেলিং
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              লেন্সের চোখে প্রকৃতি, জনজীবন, সংস্কৃতি ও ইতিহাসের অসাধারণ মুহূর্তগুলো।
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
            মোট অ্যালবাম: {toBanglaNumber(galleries.length)} টি
          </span>
        </div>

        <AdSlot placement="TOP_BANNER" />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {galleries.map((g) => (
            <PhotoGalleryCard key={g.id} gallery={g} />
          ))}
        </div>

        <AdSlot placement="FOOTER" />
      </main>

      <Footer />
    </div>
  );
}
