'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, RefreshCw, ChevronRight, Zap } from 'lucide-react';
import { formatBanglaTime, toBanglaNumber } from '@/lib/date';
import { NewsCardData } from './NewsCard';

interface LatestNewsPanelProps {
  initialArticles?: NewsCardData[];
}

export function LatestNewsPanel({ initialArticles = [] }: LatestNewsPanelProps) {
  const [articles, setArticles] = useState<NewsCardData[]>(initialArticles);
  const [hasNewUpdate, setHasNewUpdate] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState(Date.now());

  // Check for updates periodically without full page reload
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/articles?limit=8&status=PUBLISHED');
        if (res.ok) {
          const data = await res.json();
          if (data.articles && data.articles.length > 0) {
            const latestId = data.articles[0]?.id;
            const currentFirstId = articles[0]?.id;
            if (latestId && currentFirstId && latestId !== currentFirstId) {
              setHasNewUpdate(true);
            }
          }
        }
      } catch {}
    }, 45000);

    return () => clearInterval(interval);
  }, [articles]);

  const loadFreshUpdates = async () => {
    try {
      const res = await fetch('/api/articles?limit=8&status=PUBLISHED');
      if (res.ok) {
        const data = await res.json();
        if (data.articles) {
          setArticles(data.articles);
          setHasNewUpdate(false);
          setLastCheckTime(Date.now());
        }
      }
    } catch {}
  };

  return (
    <div className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200/80 dark:border-darkbg-border p-4 shadow-xs flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
              সর্বশেষ সংবাদ
            </h3>
          </div>

          <Link
            href="/latest-news"
            className="text-xs font-semibold text-newspaper-blue dark:text-blue-400 hover:text-newspaper-accent transition-colors flex items-center gap-0.5"
          >
            <span>সব দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* New story incoming notification badge */}
        {hasNewUpdate && (
          <button
            onClick={loadFreshUpdates}
            className="w-full mt-2.5 py-1.5 px-3 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-medium rounded flex items-center justify-center gap-1.5 hover:bg-amber-500/20 transition-all animate-pulse"
          >
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>নতুন খবর এসেছে — ক্লিক করে রিফ্রেশ করুন</span>
          </button>
        )}

        {/* Latest Stream List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-1">
          {articles.slice(0, 7).map((art) => {
            const displayTitle = art.titleBn || art.title;
            const categoryName = art.category?.nameBn || art.category?.name;

            return (
              <article key={art.id} className="py-2.5 group">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-0.5">
                  <span className="font-semibold text-newspaper-accent">
                    {formatBanglaTime(art.publishedAt)}
                  </span>
                  {categoryName && (
                    <>
                      <span>•</span>
                      <span className="font-medium text-slate-500 dark:text-slate-400">
                        {categoryName}
                      </span>
                    </>
                  )}
                </div>

                <h4 className="font-headline font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover:text-newspaper-blue dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                  <Link href={`/news/${art.slug}`}>
                    {displayTitle}
                  </Link>
                </h4>
              </article>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
        <Link
          href="/latest-news"
          className="w-full block py-2 rounded text-center text-xs font-semibold bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
        >
          সব খবর দেখুন →
        </Link>
      </div>
    </div>
  );
}
export default LatestNewsPanel;
