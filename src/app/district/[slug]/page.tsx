import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HorizontalNewsCard from '@/components/news/HorizontalNewsCard';
import MostReadTrendingTabs from '@/components/news/MostReadTrendingTabs';
import AdSlot from '@/components/ads/AdSlot';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';

interface DistrictDetailPageProps {
  params: { slug: string };
}

export const revalidate = 60;

export default async function DistrictDetailPage({ params }: DistrictDetailPageProps) {
  const district = await prisma.district.findUnique({
    where: { slug: params.slug },
  }).catch(() => null);

  if (!district) {
    notFound();
  }

  const [articles, trendingArticles] = await Promise.all([
    prisma.article.findMany({
      where: {
        districtId: district.id,
        status: 'PUBLISHED',
      },
      orderBy: { publishedAt: 'desc' },
      take: 20,
      include: { category: true, author: true, district: true },
    }).catch(() => []),
    prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { viewsCount: 'desc' },
      take: 5,
      include: { category: true, author: true },
    }).catch(() => []),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* District Banner */}
        <div className="pb-6 mb-6 border-b border-slate-200 dark:border-darkbg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Link href="/" className="hover:underline">প্রচ্ছদ</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/district" className="hover:underline">জেলা সংবাদ</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">{district.nameBn}</span>
            </nav>
            <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
              {district.nameBn} জেলার খবর
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {district.divisionBn} বিভাগ — প্রকাশিত মোট সংবাদ: <span className="font-bold text-newspaper-navy dark:text-blue-400">{toBanglaNumber(articles.length)}</span> টি
            </p>
          </div>

          <Link
            href="/district"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors self-start sm:self-auto"
          >
            অন্যান্য জেলা দেখুন →
          </Link>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-4">
            {articles.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {district.nameBn} জেলায় এই মুহূর্তে কোনো বিশেষ প্রতিবেদন নেই।
                </p>
                <Link href="/latest-news" className="mt-4 inline-block text-xs font-semibold text-newspaper-blue hover:underline">
                  জাতীয় ও সর্বশেষ সংবাদের পাতায় যান →
                </Link>
              </div>
            ) : (
              articles.map((art) => (
                <HorizontalNewsCard key={art.id} article={art} />
              ))
            )}
          </div>

          {/* Sidebar */}
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
