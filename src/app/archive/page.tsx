import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HorizontalNewsCard from '@/components/news/HorizontalNewsCard';
import AdSlot from '@/components/ads/AdSlot';
import { Calendar, Archive as ArchiveIcon, Clock } from 'lucide-react';
import { formatBanglaFullDate, toBanglaNumber } from '@/lib/date';

export default async function ArchiveIndexPage() {
  const recentArticles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 15,
    include: { category: true, author: true, district: true },
  }).catch(() => []);

  // Dates for quick filter: Today, Yesterday, 2 days ago, etc.
  const dateShortcuts = [0, 1, 2, 3, 4, 5, 6].map((daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return {
      label: daysAgo === 0 ? 'আজকের খবর' : daysAgo === 1 ? 'গতকালের খবর' : `${daysAgo} দিন আগে`,
      fullDate: formatBanglaFullDate(d),
      url: `/archive/${yyyy}/${mm}/${dd}`,
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Header */}
        <div className="pb-6 mb-6 border-b border-slate-200 dark:border-darkbg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-newspaper-navy dark:text-blue-400 uppercase tracking-widest mb-1">
              <ArchiveIcon className="w-4 h-4" />
              <span>সংবাদ আর্কাইভ / NEWS ARCHIVE</span>
            </div>
            <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
              তারিখভিত্তিক সংবাদ মহাফেজখানা
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              নির্দিষ্ট দিনের বা অতীতের প্রকাশিত সকল সংবাদ অনুসন্ধান করুন।
            </p>
          </div>
        </div>

        {/* Date Quick Filter Grid */}
        <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            দ্রুত তারিখ নির্বাচন করুন
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {dateShortcuts.map((sc) => (
              <Link
                key={sc.url}
                href={sc.url}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-newspaper-navy hover:text-white dark:hover:bg-blue-600 transition-all text-center"
              >
                <span className="font-bold text-xs block mb-1">{sc.label}</span>
                <span className="text-[10px] text-slate-400 block truncate">{sc.fullDate}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Archive List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-headline font-bold text-xl text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
              সাম্প্রতিক প্রকাশিত সংবাদের তালিকা
            </h2>
            {recentArticles.map((art) => (
              <HorizontalNewsCard key={art.id} article={art} />
            ))}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <AdSlot placement="SIDEBAR" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
