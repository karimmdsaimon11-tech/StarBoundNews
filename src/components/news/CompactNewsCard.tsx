import React from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { getBanglaRelativeTime } from '@/lib/date';
import { NewsCardData } from './NewsCard';

interface CompactNewsCardProps {
  article: NewsCardData;
  className?: string;
  showThumbnail?: boolean;
}

export function CompactNewsCard({ article, className = '', showThumbnail = true }: CompactNewsCardProps) {
  const displayTitle = article.titleBn || article.title;
  const categoryName = article.category?.nameBn || article.category?.name;

  return (
    <article className={`group flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0 ${className}`}>
      {showThumbnail && (
        <Link
          href={`/news/${article.slug}`}
          className="relative flex-shrink-0 w-24 h-16 sm:w-28 sm:h-18 rounded overflow-hidden bg-slate-100 dark:bg-slate-800"
        >
          <img
            src={article.featuredImage}
            alt={displayTitle}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}

      <div className="flex-1 min-w-0">
        {categoryName && (
          <span className="text-[10px] font-bold text-newspaper-blue dark:text-blue-400 uppercase tracking-wider block mb-0.5">
            {categoryName}
          </span>
        )}

        <h4 className="font-headline font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-newspaper-blue dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
          <Link href={`/news/${article.slug}`}>
            {displayTitle}
          </Link>
        </h4>

        <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
          <Clock className="w-2.5 h-2.5" />
          <span>{getBanglaRelativeTime(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
}
export default CompactNewsCard;
