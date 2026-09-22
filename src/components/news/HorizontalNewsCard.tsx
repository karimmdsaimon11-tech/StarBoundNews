import React from 'react';
import Link from 'next/link';
import { Clock, Eye, User } from 'lucide-react';
import { getBanglaRelativeTime, toBanglaNumber, formatBanglaDateTime } from '@/lib/date';
import { NewsCardData } from './NewsCard';

interface HorizontalNewsCardProps {
  article: NewsCardData;
  className?: string;
}

export function HorizontalNewsCard({ article, className = '' }: HorizontalNewsCardProps) {
  const displayTitle = article.titleBn || article.title;
  const categoryName = article.category?.nameBn || article.category?.name;

  return (
    <article className={`group flex flex-col sm:flex-row items-start gap-4 p-4 bg-white dark:bg-darkbg-card rounded-lg border border-slate-200/80 dark:border-darkbg-border hover:border-newspaper-blue/40 transition-all duration-200 shadow-xs hover:shadow-sm ${className}`}>
      {/* Thumbnail */}
      <Link
        href={`/news/${article.slug}`}
        className="relative flex-shrink-0 w-full sm:w-56 md:w-64 aspect-[16/10] rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800"
      >
        <img
          src={article.featuredImage}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {categoryName && (
          <span className="absolute top-2 left-2 text-[10px] font-bold text-white bg-newspaper-navy/90 px-2 py-0.5 rounded">
            {categoryName}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between h-full min-w-0">
        <div>
          <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-newspaper-blue dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2">
            <Link href={`/news/${article.slug}`}>
              {displayTitle}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            {article.author && (
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {article.author.nameBn || article.author.name}
              </span>
            )}
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {getBanglaRelativeTime(article.publishedAt)}
            </span>
          </div>

          {article.viewsCount !== undefined && article.viewsCount > 0 && (
            <div className="flex items-center gap-1 text-[11px]">
              <Eye className="w-3 h-3 text-slate-400" />
              <span>{toBanglaNumber(article.viewsCount)}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
export default HorizontalNewsCard;
