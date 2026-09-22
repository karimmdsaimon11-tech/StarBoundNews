import React from 'react';
import { prisma } from '@/lib/prisma';
import { ArticleStatus } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HorizontalNewsCard from '@/components/news/HorizontalNewsCard';
import MostReadTrendingTabs from '@/components/news/MostReadTrendingTabs';
import AdSlot from '@/components/ads/AdSlot';
import Link from 'next/link';
import { Clock, Filter, Radio } from 'lucide-react';
import { formatBanglaFullDate } from '@/lib/date';
import { MAIN_CATEGORIES } from '@/lib/constants';
import { ensureDailyNewsFresh } from '@/lib/dailyNewsSync';

export const revalidate = 15;

export default async function LatestNewsPage({
  searchParams,
}: {
  searchParams: { category?: string; date?: string };
}) {
  await ensureDailyNewsFresh().catch(() => {});
  const selectedCategory = searchParams.category;

  const where: any = { status: ArticleStatus.PUBLISHED };
  if (selectedCategory) {
    where.category = { slug: selectedCategory };
  }

  const [articles, trendingArticles, categories] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: 25,
      include: { category: true, author: true, district: true },
    }).catch(() => []),
    prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED },
      orderBy: { viewsCount: 'desc' },
      take: 5,
      include: { category: true, author: true },
    }).catch(() => []),
    prisma.category.findMany({
      orderBy: { order: 'asc' },
    }).catch(() => []),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Page Header */}
        <div className="pb-6 mb-6 border-b border-slate-200 dark:border-darkbg-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                লাইভ নিউজ স্ট্রিম (Live Stream)
              </span>
            </div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white">
              সর্বশেষ সংবাদ / Latest News
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              আজ {formatBanglaFullDate(new Date())} — প্রকাশিত সংবাদের তাৎক্ষণিক হালনাগাদ
            </p>
          </div>

          {/* Quick Date Selector CTA */}
          <Link
            href="/today"
            className="self-start md:self-auto px-4 py-2 rounded-lg bg-newspaper-navy text-white hover:bg-newspaper-blue text-xs font-semibold transition-colors shadow-xs"
          >
            আজকের সকল সংবাদ দেখুন →
          </Link>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          <Link
            href="/latest-news"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              !selectedCategory
                ? 'bg-newspaper-accent text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            সকল সংবাদ
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/latest-news?category=${cat.slug}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-newspaper-accent text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.nameBn}
            </Link>
          ))}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {articles.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                <p className="text-base text-slate-500 dark:text-slate-400">
                  এই ক্যাটাগরিতে এখনো কোনো সংবাদ প্রকাশিত হয়নি।
                </p>
                <Link
                  href="/latest-news"
                  className="mt-4 inline-block text-xs font-semibold text-newspaper-blue hover:underline"
                >
                  সকল সংবাদের তালিকায় ফিরে যান →
                </Link>
              </div>
            ) : (
              articles.map((art) => (
                <HorizontalNewsCard key={art.id} article={art} />
              ))
            )}
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
