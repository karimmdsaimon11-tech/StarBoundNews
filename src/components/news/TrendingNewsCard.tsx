import React from 'react';
import Link from 'next/link';
import { toBanglaNumber } from '@/lib/date';
import { NewsCardData } from './NewsCard';

interface TrendingNewsCardProps {
  article: NewsCardData;
  index: number;
}

export function TrendingNewsCard({ article, index }: TrendingNewsCardProps) {
  const displayTitle = article.titleBn || article.title;
  const categoryName = article.category?.nameBn || article.category?.name;

  return (
    <article className="group flex items-start gap-3.5 py-2.5 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0">
      {/* Big Ranking Number */}
      <span className="font-serif font-black text-2xl sm:text-3xl text-slate-300 dark:text-slate-700 group-hover:text-newspaper-accent transition-colors flex-shrink-0 w-7 text-center">
        {toBanglaNumber(index + 1)}
      </span>

      <div className="flex-1 min-w-0">
        {categoryName && (
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-0.5">
            {categoryName}
          </span>
        )}
        <h4 className="font-headline font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-newspaper-blue dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
          <Link href={`/news/${article.slug}`}>
            {displayTitle}
          </Link>
        </h4>
      </div>
    </article>
  );
}
export default TrendingNewsCard;
