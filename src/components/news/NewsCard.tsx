import React from 'react';
import Link from 'next/link';
import { Clock, Eye } from 'lucide-react';
import { getBanglaRelativeTime, toBanglaNumber } from '@/lib/date';

export interface NewsCardData {
  id: string;
  title: string;
  titleBn?: string | null;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedAt?: string | Date | null;
  viewsCount?: number;
  readTimeMinutes?: number;
  category?: {
    name: string;
    nameBn: string;
    slug: string;
    color?: string | null;
  } | null;
  author?: {
    name: string;
    nameBn?: string | null;
    avatar?: string | null;
  } | null;
}

interface NewsCardProps {
  article: NewsCardData;
  className?: string;
  showExcerpt?: boolean;
}

export function NewsCard({ article, className = '', showExcerpt = false }: NewsCardProps) {
  const displayTitle = article.titleBn || article.title;
  const categoryName = article.category?.nameBn || article.category?.name || 'সংবাদ';
  const categorySlug = article.category?.slug || 'latest-news';

  return (
    <article className={`group flex flex-col bg-white dark:bg-darkbg-card rounded-lg overflow-hidden border border-slate-200/80 dark:border-darkbg-border hover:border-newspaper-blue/40 transition-all duration-200 shadow-xs hover:shadow-md ${className}`}>
      {/* Image Thumbnail */}
      <Link href={`/news/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={article.featuredImage}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {article.category && (
          <span
            className="absolute top-2.5 left-2.5 text-[11px] font-bold text-white px-2 py-0.5 rounded shadow-xs"
            style={{ backgroundColor: article.category.color || '#1E3E62' }}
          >
            {categoryName}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-newspaper-blue dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug">
            <Link href={`/news/${article.slug}`}>
              {displayTitle}
            </Link>
          </h3>

          {showExcerpt && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Metadata */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{getBanglaRelativeTime(article.publishedAt)}</span>
          </div>

          {article.viewsCount !== undefined && article.viewsCount > 0 && (
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-slate-400" />
              <span>{toBanglaNumber(article.viewsCount)}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
export default NewsCard;
