import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { NewsCardData, NewsCard } from './NewsCard';
import CompactNewsCard from './CompactNewsCard';

interface CategoryBlockProps {
  title: string;
  titleBn: string;
  slug: string;
  color?: string | null;
  articles: NewsCardData[];
  className?: string;
}

export function CategoryBlock({
  title,
  titleBn,
  slug,
  color = '#1E3E62',
  articles = [],
  className = '',
}: CategoryBlockProps) {
  if (articles.length === 0) return null;

  const leadArticle = articles[0];
  const subArticles = articles.slice(1, 5);

  return (
    <section className={`py-6 border-b border-slate-200/80 dark:border-darkbg-border last:border-b-0 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2" style={{ borderColor: color || '#1E3E62' }}>
        <div className="flex items-center gap-2">
          <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
            {titleBn}
          </h2>
          <span className="text-xs uppercase text-slate-400 dark:text-slate-500 font-semibold tracking-wider hidden sm:inline">
            / {title}
          </span>
        </div>

        <Link
          href={`/${slug}`}
          className="text-xs font-semibold transition-colors flex items-center gap-1 hover:underline"
          style={{ color: color || '#1E3E62' }}
        >
          <span>আরও খবর</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid: 1 Featured + Sub list */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Featured Story (6 or 7 cols) */}
        <div className="md:col-span-6 lg:col-span-7">
          <NewsCard article={leadArticle} showExcerpt={true} className="h-full" />
        </div>

        {/* Right Sub-articles List (6 or 5 cols) */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between bg-slate-50/50 dark:bg-darkbg-card/40 p-3 rounded-lg border border-slate-100 dark:border-darkbg-border">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {subArticles.map((art) => (
              <CompactNewsCard key={art.id} article={art} showThumbnail={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default CategoryBlock;
