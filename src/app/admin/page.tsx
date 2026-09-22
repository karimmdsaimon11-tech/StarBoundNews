import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminLayout from '@/components/admin/AdminLayout';
import StatsCard from '@/components/admin/StatsCard';
import Link from 'next/link';
import {
  FileText,
  Clock,
  Eye,
  Flame,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  Plus,
  Users,
  Megaphone,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { formatBanglaDateTime, toBanglaNumber, getDhakaDayBoundaries } from '@/lib/date';
import DailySyncButton from '@/components/admin/DailySyncButton';

export const revalidate = 0; // Live admin dashboard

export default async function AdminDashboardPage() {
  const { startOfDay, endOfDay } = getDhakaDayBoundaries();

  // Calculate yesterday's boundaries in BST
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const { startOfDay: startOfYesterday, endOfDay: endOfYesterday } = getDhakaDayBoundaries(yesterday.toISOString());

  // Week and month boundaries
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const startOfMonth = new Date();
  startOfMonth.setDate(startOfMonth.getDate() - 30);

  const [
    totalArticles,
    publishedToday,
    publishedYesterday,
    publishedThisWeek,
    publishedThisMonth,
    draftCount,
    scheduledCount,
    pendingReviewCount,
    totalViewsResult,
    breakingCount,
    recentArticles,
    topViewedArticles,
    recentAuditLogs,
    pendingCommentsCount,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({
      where: {
        status: 'PUBLISHED',
        publishedAt: { gte: startOfDay, lte: endOfDay },
      },
    }),
    prisma.article.count({
      where: {
        status: 'PUBLISHED',
        publishedAt: { gte: startOfYesterday, lte: endOfYesterday },
      },
    }),
    prisma.article.count({
      where: {
        status: 'PUBLISHED',
        publishedAt: { gte: startOfWeek },
      },
    }),
    prisma.article.count({
      where: {
        status: 'PUBLISHED',
        publishedAt: { gte: startOfMonth },
      },
    }),
    prisma.article.count({ where: { status: 'DRAFT' } }),
    prisma.article.count({ where: { status: 'SCHEDULED' } }),
    prisma.article.count({ where: { status: 'PENDING_REVIEW' } }),
    prisma.article.aggregate({ _sum: { viewsCount: true } }),
    prisma.breakingNews.count({ where: { isActive: true } }),
    prisma.article.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { category: true, author: true },
    }),
    prisma.article.findMany({
      take: 5,
      where: { status: 'PUBLISHED' },
      orderBy: { viewsCount: 'desc' },
      include: { category: true },
    }),
    prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }).catch(() => []),
    prisma.comment.count({ where: { status: 'PENDING' } }).catch(() => 0),
  ]);

  const totalViews = totalViewsResult._sum.viewsCount || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome & Quick Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              নিউজ পাবলিশিং ও সম্পাদকীয় কন্ট্রোল প্যানেল
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              স্ট্যাটবাউন্ড ডিজিটাল নিউজরুম — আজকের সার্বিক প্রকাশনা ও পাঠ পরিসংখ্যান
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DailySyncButton />
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-newspaper-accent hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন সংবাদ লিখুন</span>
            </Link>
          </div>
        </div>

        {/* Daily Publishing Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="আজকের প্রকাশিত সংবাদ"
            titleEn="Published Today"
            value={publishedToday}
            subtitle={`গতকাল প্রকাশিত হয়েছিল: ${toBanglaNumber(publishedYesterday)} টি`}
            icon={FileText}
            color="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          />

          <StatsCard
            title="চলতি সপ্তাহের সংবাদ"
            titleEn="This Week (7 Days)"
            value={publishedThisWeek}
            subtitle={`চলতি মাসে মোট: ${toBanglaNumber(publishedThisMonth)} টি`}
            icon={Calendar}
            color="bg-newspaper-navy/10 text-newspaper-navy dark:text-blue-400"
          />

          <StatsCard
            title="মোট পাঠক ভিউ সংখ্যা"
            titleEn="Total Article Reads"
            value={totalViews}
            subtitle="প্রকৃত পাঠক এনগেজমেন্ট"
            icon={Eye}
            color="bg-purple-500/10 text-purple-600 dark:text-purple-400"
          />

          <StatsCard
            title="সক্রিয় ব্রেকিং নিউজ"
            titleEn="Active Breaking Ticker"
            value={breakingCount}
            subtitle="স্ক্রল টিকারে চলমান"
            icon={Flame}
            color="bg-red-500/10 text-red-600 dark:text-red-400"
          />
        </div>

        {/* Secondary Editorial Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">খসড়া (Drafts)</span>
            <span className="font-bold text-xl text-slate-800 dark:text-slate-200 mt-2">{toBanglaNumber(draftCount)}</span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border flex flex-col justify-between">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">পর্যালোচনাধীন (Review)</span>
            <span className="font-bold text-xl text-amber-600 dark:text-amber-400 mt-2">{toBanglaNumber(pendingReviewCount)}</span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border flex flex-col justify-between">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">শিডিউল করা (Scheduled)</span>
            <span className="font-bold text-xl text-blue-600 dark:text-blue-400 mt-2">{toBanglaNumber(scheduledCount)}</span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border flex flex-col justify-between">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">অপেক্ষমাণ মন্তব্য</span>
            <span className="font-bold text-xl text-rose-600 dark:text-rose-400 mt-2">{toBanglaNumber(pendingCommentsCount)}</span>
          </div>
        </div>

        {/* Main 2-Column Section: Recent Articles & Top Viewed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Articles Table (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-darkbg-card p-5 sm:p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                সাম্প্রতিক সংবাদ তালিকা / Recent Articles
              </h2>
              <Link
                href="/admin/articles"
                className="text-xs font-semibold text-newspaper-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>সব দেখুন</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-2.5">শিরোনাম</th>
                    <th className="pb-2.5">বিভাগ</th>
                    <th className="pb-2.5">লেখক</th>
                    <th className="pb-2.5">স্ট্যাটাস</th>
                    <th className="pb-2.5">সময়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 pr-3 font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                        <Link href={`/admin/articles/${art.id}/edit`} className="hover:text-newspaper-accent">
                          {art.titleBn || art.title}
                        </Link>
                      </td>
                      <td className="py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {art.category?.nameBn || 'সাধারণ'}
                      </td>
                      <td className="py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {art.author?.nameBn || art.author?.name}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          art.status === 'PUBLISHED'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : art.status === 'DRAFT'
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {art.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400 whitespace-nowrap text-[11px]">
                        {formatBanglaDateTime(art.publishedAt || art.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Most Read Stories & Quick Shortcuts (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Top Viewed List */}
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                <TrendingUp className="w-4 h-4 text-newspaper-accent" />
                <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                  সর্বাধিক পঠিত সংবাদ
                </h3>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {topViewedArticles.map((art, i) => (
                  <div key={art.id} className="py-2.5 flex items-start gap-3">
                    <span className="font-bold text-base text-slate-300 dark:text-slate-600">
                      {toBanglaNumber(i + 1)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/admin/articles/${art.id}/edit`}
                        className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-newspaper-accent line-clamp-2 leading-snug block"
                      >
                        {art.titleBn || art.title}
                      </Link>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        {toBanglaNumber(art.viewsCount || 0)} ভিউ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Management Cards */}
            <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-headline font-bold text-sm text-white">
                দ্রুত সিএমএস একশন
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <Link
                  href="/admin/breaking-news"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2"
                >
                  <Flame className="w-3.5 h-3.5 text-red-500" />
                  <span>ব্রেকিং নিউজ</span>
                </Link>
                <Link
                  href="/admin/advertisements"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2"
                >
                  <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>বিজ্ঞাপন</span>
                </Link>
                <Link
                  href="/admin/categories"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ক্যাটাগরি</span>
                </Link>
                <Link
                  href="/admin/comments"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  <span>মডারেশন</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
