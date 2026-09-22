import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminLayout from '@/components/admin/AdminLayout';
import StatsCard from '@/components/admin/StatsCard';
import { BarChart3, TrendingUp, Eye, FileText, Users, Globe, Smartphone, Monitor } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';

export const revalidate = 0;

export default async function AdminAnalyticsPage() {
  const [totalArticles, totalViewsAgg, topArticles, categories] = await Promise.all([
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.aggregate({ _sum: { viewsCount: true } }),
    prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      take: 8,
      orderBy: { viewsCount: 'desc' },
      include: { category: true, author: true },
    }),
    prisma.category.findMany({
      include: { _count: { select: { articles: true } } },
    }),
  ]);

  const totalViews = totalViewsAgg._sum.viewsCount || 0;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="pb-4 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              সম্পাদকীয় ও পাঠক অ্যানালিটিক্স / Analytics Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              প্রকৃত পাঠক এনগেজমেন্ট, ট্রেন্ডিং বিষয়বস্তু ও ক্যাটাগরি পারফরম্যান্স প্রতিবেদন।
            </p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard
            title="মোট পাঠক ভিউ"
            titleEn="Total Page Views"
            value={totalViews}
            subtitle="প্রকৃত পাঠক ভিজিট"
            icon={Eye}
            color="bg-purple-500/10 text-purple-600"
          />
          <StatsCard
            title="প্রকাশিত মোট প্রতিবেদন"
            titleEn="Published Articles"
            value={totalArticles}
            subtitle="সক্রিয় নিউজ ডেটাবেজে"
            icon={FileText}
            color="bg-emerald-500/10 text-emerald-600"
          />
          <StatsCard
            title="গড় পঠন অনুপাত"
            titleEn="Avg Reads / Article"
            value={totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0}
            subtitle="প্রতি আর্টিকেলে গড় পাঠক"
            icon={TrendingUp}
            color="bg-blue-500/10 text-blue-600"
          />
        </div>

        {/* 2-Column: Top Articles & Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top Articles Table */}
          <div className="lg:col-span-8 bg-white dark:bg-darkbg-card p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-4">
              শীর্ষ পারফরমিং সংবাদ তালিকা (Top Read Stories)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="pb-2">র‌্যাংক ও শিরোনাম</th>
                    <th className="pb-2">বিভাগ</th>
                    <th className="pb-2 text-right">ভিউ সংখ্যা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {topArticles.map((art, idx) => (
                    <tr key={art.id}>
                      <td className="py-3 font-semibold text-slate-900 dark:text-slate-100 max-w-sm truncate">
                        <span className="font-mono text-slate-400 mr-2">#{idx + 1}</span>
                        {art.titleBn || art.title}
                      </td>
                      <td className="py-3 text-slate-500">{art.category?.nameBn || 'সাধারণ'}</td>
                      <td className="py-3 font-bold text-right text-newspaper-navy dark:text-blue-400">
                        {toBanglaNumber(art.viewsCount || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="lg:col-span-4 bg-white dark:bg-darkbg-card p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-4">
              বিভাগভিত্তিক সংবাদ বণ্টন
            </h2>

            <div className="space-y-3">
              {categories.map((c) => (
                <div key={c.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color || '#1E3E62' }} />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{c.nameBn}</span>
                  </div>
                  <span className="font-bold text-slate-600 dark:text-slate-400">
                    {toBanglaNumber(c._count.articles)} টি
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
