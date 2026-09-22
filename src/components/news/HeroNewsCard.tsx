import React from 'react';
import Link from 'next/link';
import { Clock, Eye, User, Sparkles } from 'lucide-react';
import { getBanglaRelativeTime, toBanglaNumber } from '@/lib/date';
import { NewsCardData } from './NewsCard';

interface HeroNewsCardProps {
  article: NewsCardData;
  className?: string;
}

export function HeroNewsCard({ article, className = '' }: HeroNewsCardProps) {
  const displayTitle = article.titleBn || article.title;
  const categoryName = article.category?.nameBn || article.category?.name || 'প্রধান সংবাদ';

  return (
    <article className={`group relative bg-white dark:bg-darkbg-card rounded-xl overflow-hidden border border-slate-200/80 dark:border-darkbg-border shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
      {/* Featured Large Image */}
      <Link href={`/news/${article.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <img
          src={article.featuredImage}
          alt={displayTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-newspaper-accent text-white font-bold text-xs uppercase px-3 py-1 rounded shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {categoryName}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <h2 className="font-headline font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-900 dark:text-white group-hover:text-newspaper-blue dark:group-hover:text-blue-400 transition-colors leading-tight mb-3">
            <Link href={`/news/${article.slug}`}>
              {displayTitle}
            </Link>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            {article.author && (
              <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                <User className="w-3.5 h-3.5 text-newspaper-accent" />
                {article.author.nameBn || article.author.name}
              </span>
            )}
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {getBanglaRelativeTime(article.publishedAt)}
            </span>
          </div>

          {article.viewsCount !== undefined && article.viewsCount > 0 && (
            <div className="flex items-center gap-1 font-medium">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{toBanglaNumber(article.viewsCount)} পঠিত</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
export default HeroNewsCard;
