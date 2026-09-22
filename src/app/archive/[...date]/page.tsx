import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HorizontalNewsCard from '@/components/news/HorizontalNewsCard';
import AdSlot from '@/components/ads/AdSlot';
import { Calendar, ChevronRight } from 'lucide-react';
import { formatBanglaFullDate, toBanglaNumber } from '@/lib/date';

interface ArchiveDatePageProps {
  params: { date: string[] };
}

export default async function ArchiveDatePage({ params }: ArchiveDatePageProps) {
  const [year, month, day] = params.date || ['2026', '09', '22'];

  const targetDateStr = `${year}-${month?.padStart(2, '0') || '01'}-${day?.padStart(2, '0') || '01'}`;
  const startDate = new Date(`${targetDateStr}T00:00:00+06:00`);
  const endDate = new Date(`${targetDateStr}T23:59:59.999+06:00`);

  let articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      publishedAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { publishedAt: 'desc' },
    include: { category: true, author: true, district: true },
  }).catch(() => []);

  // Fallback to recent if date has no articles
  if (articles.length === 0) {
    articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 10,
      include: { category: true, author: true, district: true },
    }).catch(() => []);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Header */}
        <div className="pb-6 mb-6 border-b border-slate-200 dark:border-darkbg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Link href="/" className="hover:underline">প্রচ্ছদ</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/archive" className="hover:underline">আর্কাইভ</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">{formatBanglaFullDate(startDate)}</span>
            </nav>
            <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white">
              {formatBanglaFullDate(startDate)} — সংবাদ আর্কাইভ
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              এই দিনে প্রকাশিত মোট সংবাদ: <span className="font-bold text-newspaper-navy dark:text-blue-400">{toBanglaNumber(articles.length)}</span> টি
            </p>
          </div>

          <Link
            href="/archive"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors self-start sm:self-auto"
          >
            অন্যান্য তারিখ দেখুন →
          </Link>
        </div>

        {/* Results List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {articles.map((art) => (
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
