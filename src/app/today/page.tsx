import React from 'react';
import { prisma } from '@/lib/prisma';
import { ArticleStatus } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HorizontalNewsCard from '@/components/news/HorizontalNewsCard';
import MostReadTrendingTabs from '@/components/news/MostReadTrendingTabs';
import AdSlot from '@/components/ads/AdSlot';
import Link from 'next/link';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { formatBanglaFullDate, getDhakaDayBoundaries, toBanglaNumber } from '@/lib/date';
import { ensureDailyNewsFresh } from '@/lib/dailyNewsSync';

export const revalidate = 30;

export default async function TodayNewsPage() {
  await ensureDailyNewsFresh().catch(() => {});
  const { startOfDay, endOfDay } = getDhakaDayBoundaries();

  // Retrieve news published today in BST (or recent published if today is early)
  let todayArticles = await prisma.article.findMany({
    where: {
      status: ArticleStatus.PUBLISHED,
      publishedAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: { publishedAt: 'desc' },
    include: { category: true, author: true, district: true },
  }).catch(() => []);

  // Fallback to recent if date boundary has fewer than 5
  if (todayArticles.length < 5) {
    todayArticles = await prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED },
      orderBy: { publishedAt: 'desc' },
      take: 20,
      include: { category: true, author: true, district: true },
    }).catch(() => []);
  }

  const trendingArticles = [...todayArticles]
    .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Page Header */}
        <div className="pb-6 mb-6 border-b border-slate-200 dark:border-darkbg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-newspaper-accent uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>বাংলাদেশ সময় (BST)</span>
            </div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white">
              আজকের খবর — {formatBanglaFullDate(new Date())}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              আজ প্রকাশিত মোট সংবাদ সংখ্যা: <span className="font-bold text-newspaper-navy dark:text-blue-400">{toBanglaNumber(todayArticles.length)}</span> টি
            </p>
          </div>

          <Link
            href="/archive"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
          >
            পূর্ববর্তী দিনের আর্কাইভ দেখুন →
          </Link>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {todayArticles.map((art) => (
              <HorizontalNewsCard key={art.id} article={art} />
            ))}
          </div>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <AdSlot placement="SIDEBAR" />
            <MostReadTrendingTabs
              trendingArticles={trendingArticles}
              mostReadArticles={trendingArticles}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
