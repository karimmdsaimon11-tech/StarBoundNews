import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoNewsCard from '@/components/news/VideoNewsCard';
import AdSlot from '@/components/ads/AdSlot';
import { PlayCircle, Video } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';

export const revalidate = 60;

export default async function VideoIndexPage() {
  const videos = await prisma.videoStory.findMany({
    orderBy: { publishedAt: 'desc' },
    include: { category: true },
  }).catch(() => []);

  const leadVideo = videos[0] || null;
  const otherVideos = videos.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Header Banner */}
        <div className="pb-6 mb-8 border-b border-slate-200 dark:border-darkbg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest mb-1">
              <PlayCircle className="w-4 h-4" />
              <span>ভিডিও সংবাদ / VIDEO NEWS</span>
            </div>
            <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
              ভিডিও প্রতিবেদন ও লাইভ কভারেজ
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              সরেজমিন অনুসন্ধান, বিশেষ সাক্ষাৎকার ও সমকালীন ঘটনার প্রামাণ্য ভিডিও চিত্রমালা।
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
            মোট ভিডিও: {toBanglaNumber(videos.length)} টি
          </span>
        </div>

        <AdSlot placement="TOP_BANNER" />

        {/* Lead Video Spotlight */}
        {leadVideo && (
          <div className="mb-10 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black shadow-inner">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${leadVideo.videoUrl.split('v=')[1] || 'dQw4w9WgXcQ'}`}
                  title={leadVideo.titleBn || leadVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between text-white py-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-950/60 px-2.5 py-1 rounded inline-block mb-3 border border-red-900/50">
                  বিশেষ ভিডিও প্রতিবেদন
                </span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl leading-snug mb-3 text-white">
                  {leadVideo.titleBn || leadVideo.title}
                </h2>
                {leadVideo.description && (
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-4">
                    {leadVideo.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>দৈর্ঘ্য: {leadVideo.duration} মিনিট</span>
                {leadVideo.viewsCount && <span>{toBanglaNumber(leadVideo.viewsCount)} বার দেখা হয়েছে</span>}
              </div>
            </div>
          </div>
        )}

        {/* Other Video Grid */}
        <h3 className="font-headline font-bold text-xl text-slate-900 dark:text-white mb-4">
          অন্যান্য ভিডিও সমূহ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
          {otherVideos.map((v) => (
            <VideoNewsCard key={v.id} video={v} />
          ))}
        </div>

        <AdSlot placement="FOOTER" />
      </main>

      <Footer />
    </div>
  );
}
