'use client';

import React, { useState } from 'react';
import { Flame, TrendingUp } from 'lucide-react';
import { NewsCardData } from './NewsCard';
import TrendingNewsCard from './TrendingNewsCard';

interface MostReadTrendingTabsProps {
  trendingArticles: NewsCardData[];
  mostReadArticles: NewsCardData[];
}

export function MostReadTrendingTabs({
  trendingArticles,
  mostReadArticles,
}: MostReadTrendingTabsProps) {
  const [activeTab, setActiveTab] = useState<'TRENDING' | 'MOST_READ'>('TRENDING');

  const displayList = activeTab === 'TRENDING' ? trendingArticles : mostReadArticles;

  return (
    <div className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200/80 dark:border-darkbg-border p-4 shadow-xs">
      {/* Tabs Switcher */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg mb-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('TRENDING')}
          className={`py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'TRENDING'
              ? 'bg-white dark:bg-darkbg shadow-xs text-newspaper-accent'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>আলোচিত সংবাদ</span>
        </button>

        <button
          onClick={() => setActiveTab('MOST_READ')}
          className={`py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'MOST_READ'
              ? 'bg-white dark:bg-darkbg shadow-xs text-newspaper-blue dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>সর্বাধিক পঠিত</span>
        </button>
      </div>

      {/* Articles List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
        {displayList.slice(0, 5).map((article, idx) => (
          <TrendingNewsCard key={article.id} article={article} index={idx} />
        ))}
      </div>
    </div>
  );
}
export default MostReadTrendingTabs;
