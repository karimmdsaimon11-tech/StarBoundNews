import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoNewsCard from '@/components/news/VideoNewsCard';
import AdSlot from '@/components/ads/AdSlot';
import Link from 'next/link';
import { PlayCircle, Eye, Clock, ChevronRight } from 'lucide-react';
import { formatBanglaDateTime, toBanglaNumber } from '@/lib/date';

interface VideoDetailPageProps {
  params: { slug: string };
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const video = await prisma.videoStory.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  }).catch(() => null);

  if (!video) notFound();

  // Increment views
  prisma.videoStory.update({
    where: { id: video.id },
    data: { viewsCount: { increment: 1 } },
  }).catch(() => {});

  const otherVideos = await prisma.videoStory.findMany({
    where: { id: { not: video.id } },
    take: 4,
    orderBy: { publishedAt: 'desc' },
  }).catch(() => []);

  const videoEmbedId = video.videoUrl.includes('v=')
    ? video.videoUrl.split('v=')[1]?.split('&')[0]
    : 'dQw4w9WgXcQ';

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
          <Link href="/" className="hover:underline">প্রচ্ছদ</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/video" className="hover:underline">ভিডিও</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-xs">{video.titleBn || video.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Video Player & Description (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black shadow-lg mb-5">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoEmbedId}`}
                title={video.titleBn || video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <h1 className="font-headline font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-3">
              {video.titleBn || video.title}
            </h1>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatBanglaDateTime(video.publishedAt)}
                </span>
                <span>•</span>
                <span>দৈর্ঘ্য: {video.duration}</span>
              </div>

              {video.viewsCount !== undefined && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{toBanglaNumber(video.viewsCount)} বার দেখা হয়েছে</span>
                </div>
              )}
            </div>

            {video.description && (
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-8">
                {video.description}
              </p>
            )}

            <AdSlot placement="ARTICLE_BOTTOM" />
          </div>

          {/* Sidebar Other Videos (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
              অন্যান্য ভিডিও
            </h3>
            {otherVideos.map((v) => (
              <VideoNewsCard key={v.id} video={v} />
            ))}
            <AdSlot placement="SIDEBAR" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
