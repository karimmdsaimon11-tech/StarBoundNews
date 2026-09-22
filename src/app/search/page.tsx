import React from 'react';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HorizontalNewsCard from '@/components/news/HorizontalNewsCard';
import AdSlot from '@/components/ads/AdSlot';
import Link from 'next/link';
import { Search as SearchIcon, Filter, FileText } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';

interface SearchPageProps {
  searchParams: { q?: string; category?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || '';
  const selectedCategory = searchParams.category;

  const where: any = { status: 'PUBLISHED' };

  if (query) {
    where.OR = [
      { title: { contains: query } },
      { titleBn: { contains: query } },
      { excerpt: { contains: query } },
      { content: { contains: query } },
      { tags: { contains: query } },
    ];
  }

  if (selectedCategory) {
    where.category = { slug: selectedCategory };
  }

  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: 30,
      include: { category: true, author: true, district: true },
    }).catch(() => []),
    prisma.category.findMany({
      orderBy: { order: 'asc' },
    }).catch(() => []),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Search Header Banner */}
        <div className="bg-white dark:bg-darkbg-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border shadow-xs mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mb-4">
              স্ট্যাটবাউন্ড সংবাদ অনুসন্ধান
            </h1>

            <form action="/search" method="GET" className="relative">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="কীওয়ার্ড, শিরোনাম, বিষয় বা এলাকা দিয়ে খুঁজুন..."
                autoFocus
                className="w-full pl-12 pr-28 py-3 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-newspaper-blue shadow-inner"
              />
              <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-newspaper-navy hover:bg-newspaper-blue text-white text-xs font-semibold transition-colors"
              >
                অনুসন্ধান
              </button>
            </form>
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {query ? (
              <span>
                " <span className="text-newspaper-accent font-bold">{query}</span> " অনুসন্ধানের ফলাফল: <span className="text-newspaper-navy dark:text-blue-400">{toBanglaNumber(articles.length)}</span> টি সংবাদ
              </span>
            ) : (
              <span>সকল সর্বশেষ সংবাদের তালিকা ({toBanglaNumber(articles.length)} টি)</span>
            )}
          </div>
        </div>

        {/* Results List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {articles.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                  আপনার অনুসন্ধানের সঙ্গে কোনো সংবাদ পাওয়া যায়নি।
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  অন্য কোনো শব্দ বা সহজ কীওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন।
                </p>
              </div>
            ) : (
              articles.map((art) => (
                <HorizontalNewsCard key={art.id} article={art} />
              ))
            )}
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
