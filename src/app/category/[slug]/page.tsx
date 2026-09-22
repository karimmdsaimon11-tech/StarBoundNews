import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { ArticleStatus } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HorizontalNewsCard from '@/components/news/HorizontalNewsCard';
import NewsCard from '@/components/news/NewsCard';
import MostReadTrendingTabs from '@/components/news/MostReadTrendingTabs';
import AdSlot from '@/components/ads/AdSlot';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { toBanglaNumber } from '@/lib/date';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  }).catch(() => null);

  if (!category) return { title: 'বিভাগ পাওয়া যায়নি' };

  return {
    title: `${category.nameBn} (${category.name}) — সংবাদ | ${SITE_NAME}`,
    description: `${category.nameBn} বিভাগের সকল সর্বশেষ ও আলোচিত সংবাদ।`,
  };
}

export const revalidate = 60;

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: { subcategories: true },
  }).catch(() => null);

  if (!category) {
    notFound();
  }

  const [articles, trendingArticles] = await Promise.all([
    prisma.article.findMany({
      where: {
        categoryId: category.id,
        status: ArticleStatus.PUBLISHED,
      },
      orderBy: { publishedAt: 'desc' },
      take: 20,
      include: { category: true, author: true, district: true },
    }).catch(() => []),
    prisma.article.findMany({
      where: {
        categoryId: category.id,
        status: ArticleStatus.PUBLISHED,
      },
      orderBy: { viewsCount: 'desc' },
      take: 5,
      include: { category: true, author: true },
    }).catch(() => []),
  ]);

  const leadArticle = articles[0] || null;
  const listArticles = articles.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Category Header Banner */}
        <div className="pb-6 mb-6 border-b-2" style={{ borderColor: category.color || '#1E3E62' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
                সংবাদ বিভাগ / CATEGORY
              </span>
              <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
                {category.nameBn} <span className="text-xl font-normal text-slate-400">({category.name})</span>
              </h1>
              {category.description && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                  {category.description}
                </p>
              )}
            </div>

            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start md:self-auto">
              মোট সংবাদ: {toBanglaNumber(articles.length)} টি
            </span>
          </div>

          {/* Subcategories if any */}
          {category.subcategories.length > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              {category.subcategories.map((sub) => (
                <span
                  key={sub.id}
                  className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  {sub.nameBn}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {leadArticle && (
              <div className="mb-8">
                <NewsCard article={leadArticle} showExcerpt={true} />
              </div>
            )}

            {listArticles.length === 0 && !leadArticle ? (
              <div className="p-8 text-center bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  এই বিভাগে এখনো কোনো সংবাদ প্রকাশিত হয়নি।
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {listArticles.map((art) => (
                  <HorizontalNewsCard key={art.id} article={art} />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <AdSlot placement="SIDEBAR" />
            <MostReadTrendingTabs
              trendingArticles={trendingArticles.length > 0 ? trendingArticles : articles.slice(0, 5)}
              mostReadArticles={trendingArticles.length > 0 ? trendingArticles : articles.slice(0, 5)}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
