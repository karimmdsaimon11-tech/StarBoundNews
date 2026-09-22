import React from 'react';
import { NewsCardData } from './NewsCard';
import HeroNewsCard from './HeroNewsCard';
import NewsCard from './NewsCard';
import LatestNewsPanel from './LatestNewsPanel';
import AdSlot from '../ads/AdSlot';

interface HeroNewsGridProps {
  heroArticle?: NewsCardData | null;
  secondaryArticles: NewsCardData[];
  latestArticles: NewsCardData[];
}

export function HeroNewsGrid({
  heroArticle,
  secondaryArticles,
  latestArticles,
}: HeroNewsGridProps) {
  if (!heroArticle && secondaryArticles.length === 0) return null;

  return (
    <section className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area (8 Cols on Desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Hero Story */}
          {heroArticle && (
            <HeroNewsCard article={heroArticle} />
          )}

          {/* Secondary 4 Articles Grid */}
          {secondaryArticles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryArticles.slice(0, 4).map((art) => (
                <NewsCard key={art.id} article={art} showExcerpt={true} />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar: Real-time Latest News & Sticky Sidebar Ad (4 Cols on Desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <LatestNewsPanel initialArticles={latestArticles} />

          {/* Sidebar Advertisement */}
          <AdSlot placement="SIDEBAR" className="hidden lg:flex" />
        </div>
      </div>
    </section>
  );
}
export default HeroNewsGrid;
