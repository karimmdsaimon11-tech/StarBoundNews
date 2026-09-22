import React from 'react';
import Link from 'next/link';
import { Quote, Feather } from 'lucide-react';
import { NewsCardData } from './NewsCard';

interface OpinionCardProps {
  article: NewsCardData;
}

export function OpinionCard({ article }: OpinionCardProps) {
  const displayTitle = article.titleBn || article.title;
  const authorName = article.author?.nameBn || article.author?.name || 'কলামিস্ট';
  const authorAvatar = article.author?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80';

  return (
    <article className="group relative bg-white dark:bg-darkbg-card rounded-xl p-5 border border-purple-100 dark:border-purple-950/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Author Headshot & Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-900 bg-purple-50 flex-shrink-0">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {authorName}
            </h4>
            <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1">
              <Feather className="w-3 h-3" />
              সম্পাদকীয় মতামত
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors leading-snug mb-2 line-clamp-3">
          <Link href={`/news/${article.slug}`}>
            "{displayTitle}"
          </Link>
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-purple-50 dark:border-purple-950/30 flex items-center justify-between text-xs text-purple-600 dark:text-purple-400 font-semibold">
        <Link href={`/news/${article.slug}`} className="hover:underline">
          সম্পূর্ণ মতামত পড়ুন →
        </Link>
      </div>
    </article>
  );
}
export default OpinionCard;
