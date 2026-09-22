import React from 'react';
import { prisma } from '@/lib/prisma';
import { ArticleStatus } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroNewsGrid from '@/components/news/HeroNewsGrid';
import CategoryBlock from '@/components/news/CategoryBlock';
import OpinionCard from '@/components/news/OpinionCard';
import VideoNewsCard from '@/components/news/VideoNewsCard';
import PhotoGalleryCard from '@/components/news/PhotoGalleryCard';
import MostReadTrendingTabs from '@/components/news/MostReadTrendingTabs';
import AdSlot from '@/components/ads/AdSlot';
import Link from 'next/link';
import { PlayCircle, Image as ImageIcon, Flame, ChevronRight, Newspaper } from 'lucide-react';

export const revalidate = 30; // Revalidate every 30s for live fresh news feel

export default async function HomePage() {
  // 1. Fetch published articles & homepage settings
  const [publishedArticles, heroSetting] = await Promise.all([
    prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED },
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
        author: true,
        district: true,
      },
      take: 40,
    }).catch(() => []),
    prisma.siteSetting.findUnique({
      where: { key: 'homepage_hero_id' },
    }).catch(() => null),
  ]);

  // 2. Separate Hero, Secondary, Latest
  const customHero = heroSetting?.value
    ? publishedArticles.find((a) => a.id === heroSetting.value)
    : null;
  const heroArticle = customHero || publishedArticles.find((a) => a.isHero) || publishedArticles[0] || null;
  const secondaryArticles = publishedArticles
    .filter((a) => a.id !== heroArticle?.id)
    .slice(0, 4);
  const latestArticles = publishedArticles.slice(0, 8);

  // 3. Trending and Most Read
  const trendingArticles = [...publishedArticles]
    .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
    .slice(0, 5);
  const mostReadArticles = publishedArticles.filter((a) => a.viewsCount && a.viewsCount > 1000).slice(0, 5);

  // 4. Group by Category
  const getCategoryArticles = (catSlug: string) => {
    return publishedArticles.filter((a) => a.category?.slug === catSlug);
  };

  const nationalNews = getCategoryArticles('national');
  const politicsNews = getCategoryArticles('politics');
  const educationNews = getCategoryArticles('education');
  const technologyNews = getCategoryArticles('technology');
  const sportsNews = getCategoryArticles('sports');
  const businessNews = getCategoryArticles('business');
  const entertainmentNews = getCategoryArticles('entertainment');
  const opinionNews = publishedArticles.filter((a) => a.isOpinion || a.category?.slug === 'opinion');

  // 5. Fetch Video Stories & Photo Galleries
  const [videos, galleries] = await Promise.all([
    prisma.videoStory.findMany({
      take: 4,
      orderBy: { publishedAt: 'desc' },
    }).catch(() => []),
    prisma.photoGallery.findMany({
      take: 2,
      orderBy: { publishedAt: 'desc' },
      include: { images: true },
    }).catch(() => []),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 w-full">
        {/* Top Banner Advertisement */}
        <AdSlot placement="TOP_BANNER" />

        {/* Hero News Grid Section (1 Hero + 4 Secondary + Latest Stream Sidebar) */}
        <HeroNewsGrid
          heroArticle={heroArticle}
          secondaryArticles={secondaryArticles}
          latestArticles={latestArticles}
        />

        {/* Homepage Hero Underlay Ad */}
        <AdSlot placement="HOMEPAGE_HERO" />

        {/* Main Content Layout: Two Columns (8 Cols Category Blocks + 4 Cols Sidebars) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
          {/* Main Category Sections (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* National Section */}
            <CategoryBlock
              title="National"
              titleBn="জাতীয়"
              slug="national"
              color="#1E3E62"
              articles={nationalNews.length > 0 ? nationalNews : publishedArticles.slice(0, 5)}
            />

            {/* Politics Section */}
            <CategoryBlock
              title="Politics"
              titleBn="রাজনীতি"
              slug="politics"
              color="#DC2626"
              articles={politicsNews.length > 0 ? politicsNews : publishedArticles.slice(2, 7)}
            />

            {/* In-Feed Advertisement */}
            <AdSlot placement="IN_FEED" />

            {/* Education & Campus Section */}
            <CategoryBlock
              title="Education"
              titleBn="শিক্ষা ও ক্যাম্পাস"
              slug="education"
              color="#059669"
              articles={educationNews.length > 0 ? educationNews : publishedArticles.slice(1, 6)}
            />

            {/* Technology Section */}
            <CategoryBlock
              title="Technology"
              titleBn="তথ্যপ্রযুক্তি ও উদ্ভাবন"
              slug="technology"
              color="#0284C7"
              articles={technologyNews.length > 0 ? technologyNews : publishedArticles.slice(3, 8)}
            />

            {/* Sports Section */}
            <CategoryBlock
              title="Sports"
              titleBn="খেলাধুলা"
              slug="sports"
              color="#16A34A"
              articles={sportsNews.length > 0 ? sportsNews : publishedArticles.slice(4, 9)}
            />

            {/* Entertainment Section */}
            <CategoryBlock
              title="Entertainment"
              titleBn="বিনোদন ও সংস্কৃতি"
              slug="entertainment"
              color="#DB2777"
              articles={entertainmentNews.length > 0 ? entertainmentNews : publishedArticles.slice(5, 10)}
            />
          </div>

          {/* Right Sticky Sidebar (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Trending & Most Read Tabbed Panel */}
            <MostReadTrendingTabs
              trendingArticles={trendingArticles.length > 0 ? trendingArticles : publishedArticles.slice(0, 5)}
              mostReadArticles={mostReadArticles.length > 0 ? mostReadArticles : publishedArticles.slice(0, 5)}
            />

            {/* Editorial Opinion Column Section */}
            <div className="bg-purple-50/50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-200/60 dark:border-purple-900/40">
              <div className="flex items-center justify-between pb-3 border-b border-purple-200/60 dark:border-purple-900/40 mb-3">
                <h3 className="font-headline font-bold text-base text-purple-900 dark:text-purple-300">
                  মতামত ও বিশ্লেষণ
                </h3>
                <Link
                  href="/opinion"
                  className="text-xs font-semibold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-0.5"
                >
                  <span>সব দেখুন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {opinionNews.slice(0, 2).map((art) => (
                  <OpinionCard key={art.id} article={art} />
                ))}
              </div>
            </div>

            {/* District News Quick Selector Box */}
            <div className="bg-slate-50 dark:bg-darkbg-card p-4 rounded-xl border border-slate-200 dark:border-darkbg-border">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                  আপনার এলাকার খবর
                </h3>
                <Link
                  href="/district"
                  className="text-xs font-semibold text-newspaper-blue dark:text-blue-400 hover:underline"
                >
                  সকল জেলা →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['চট্টগ্রাম', 'ঢাকা', 'কুমিল্লা', 'কক্সবাজার', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল'].map((dist, i) => (
                  <Link
                    key={dist}
                    href={`/district/${['chattogram', 'dhaka', 'cumilla', 'coxs-bazar', 'sylhet', 'rajshahi', 'khulna', 'barishal'][i]}`}
                    className="p-2 rounded bg-white dark:bg-slate-800 hover:bg-newspaper-navy hover:text-white dark:hover:bg-blue-600 transition-colors text-center border border-slate-100 dark:border-slate-700 font-medium"
                  >
                    {dist}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sticky Sidebar Ad */}
            <AdSlot placement="SIDEBAR" />
          </div>
        </div>

        {/* Multimedia Highlights Section: Video Spotlight & Photo Gallery */}
        <section className="my-10 pt-8 border-t-2 border-slate-900 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-red-600" />
              <h2 className="font-headline font-bold text-2xl text-slate-900 dark:text-white">
                ভিডিও ও ছবির গল্প
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <Link href="/video" className="text-red-600 hover:underline">
                সকল ভিডিও →
              </Link>
              <span className="text-slate-400">|</span>
              <Link href="/photo-gallery" className="text-amber-500 hover:underline">
                ফটো গ্যালারি →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {videos.slice(0, 2).map((v) => (
              <VideoNewsCard key={v.id} video={v} />
            ))}
            {galleries.slice(0, 2).map((g) => (
              <PhotoGalleryCard key={g.id} gallery={g} />
            ))}
          </div>
        </section>

        {/* Bottom Banner Advertisement */}
        <AdSlot placement="FOOTER" />
      </main>

      <Footer />
    </div>
  );
}
