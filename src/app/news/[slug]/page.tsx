import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { ArticleStatus } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShareButtons from '@/components/common/ShareButtons';
import CommentSection from '@/components/common/CommentSection';
import AdSlot from '@/components/ads/AdSlot';
import NewsCard from '@/components/news/NewsCard';
import MostReadTrendingTabs from '@/components/news/MostReadTrendingTabs';
import { Clock, Eye, User, Calendar, Tag, ChevronRight, Bookmark, Printer, Sparkles } from 'lucide-react';
import { formatBanglaDateTime, formatBanglaFullDate, toBanglaNumber, getBanglaRelativeTime } from '@/lib/date';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { getNewsArticleSchema, getBreadcrumbSchema } from '@/lib/seo';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { category: true, author: true },
  }).catch(() => null);

  if (!article) {
    return { title: 'সংবাদ পাওয়া যায়নি' };
  }

  const title = article.titleBn || article.title;
  const description = article.seoDescription || article.excerpt;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: article.tags?.split(',').map((t) => t.trim()) || [],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/news/${article.slug}`,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.author?.name || 'StatBound Reporter'],
      section: article.category?.nameBn || 'জাতীয়',
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.featuredImage],
    },
  };
}

export const revalidate = 60;

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      subcategory: true,
      author: true,
      district: true,
      opinionAuthor: true,
      comments: {
        where: { status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
      },
    },
  }).catch(() => null);

  if (!article || article.status !== ArticleStatus.PUBLISHED) {
    notFound();
  }

  // Increment view count asynchronously
  prisma.article.update({
    where: { id: article.id },
    data: { viewsCount: { increment: 1 } },
  }).catch(() => {});

  // Related articles in same category
  const [relatedArticles, trendingArticles] = await Promise.all([
    prisma.article.findMany({
      where: {
        categoryId: article.categoryId,
        id: { not: article.id },
        status: ArticleStatus.PUBLISHED,
      },
      take: 4,
      orderBy: { publishedAt: 'desc' },
      include: { category: true, author: true },
    }).catch(() => []),
    prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED },
      orderBy: { viewsCount: 'desc' },
      take: 5,
      include: { category: true, author: true },
    }).catch(() => []),
  ]);

  const displayTitle = article.titleBn || article.title;
  const categoryName = article.category?.nameBn || article.category?.name || 'জাতীয়';
  const categorySlug = article.category?.slug || 'national';
  const articleUrl = `${SITE_URL}/news/${article.slug}`;

  // Structured Data Schemas
  const articleSchema = getNewsArticleSchema({
    title: displayTitle,
    description: article.excerpt,
    url: articleUrl,
    imageUrl: article.featuredImage,
    datePublished: article.publishedAt?.toISOString() || article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    authorName: article.author?.nameBn || article.author?.name || 'StatBound Reporter',
    authorUrl: `${SITE_URL}/author/${article.author?.slug}`,
    categoryName,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'প্রচ্ছদ', url: SITE_URL },
    { name: categoryName, url: `${SITE_URL}/${categorySlug}` },
    { name: displayTitle, url: articleUrl },
  ]);

  const tagsList = article.tags
    ? article.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        {/* Top Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-newspaper-navy dark:hover:text-white transition-colors">
            প্রচ্ছদ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/${categorySlug}`} className="hover:text-newspaper-navy dark:hover:text-white transition-colors font-medium">
            {categoryName}
          </Link>
          {article.district && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/district/${article.district.slug}`} className="hover:text-newspaper-navy dark:hover:text-white transition-colors">
                {article.district.nameBn}
              </Link>
            </>
          )}
        </nav>

        {/* Top Ad Slot */}
        <AdSlot placement="ARTICLE_TOP" />

        {/* 2-Column Grid: Article (8 Cols) & Sidebar (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-4">
          {/* Main Article Content (8 Cols) */}
          <article className="lg:col-span-8 bg-white dark:bg-darkbg-card p-4 sm:p-7 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-3">
              <Link
                href={`/${categorySlug}`}
                className="text-xs font-bold text-white px-3 py-1 rounded shadow-xs"
                style={{ backgroundColor: article.category?.color || '#1E3E62' }}
              >
                {categoryName}
              </Link>
              {article.district && (
                <Link
                  href={`/district/${article.district.slug}`}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded hover:bg-slate-200 transition-colors"
                >
                  {article.district.nameBn} জেলা
                </Link>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="font-headline font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white leading-tight mb-3">
              {displayTitle}
            </h1>

            {/* Subheadline if present */}
            {article.subtitle && (
              <h2 className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                {article.subtitle}
              </h2>
            )}

            {/* Author, Date, Share & Reading Meta Bar */}
            <div className="py-3 my-4 border-y border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Author & Timestamp */}
              <div className="flex items-center gap-3">
                <Link href={`/author/${article.author?.slug}`} className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                  <img
                    src={article.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                    alt={article.author?.nameBn || article.author?.name || 'Author'}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div>
                  <Link
                    href={`/author/${article.author?.slug}`}
                    className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-newspaper-blue dark:hover:text-blue-400 transition-colors block"
                  >
                    {article.author?.nameBn || article.author?.name}
                  </Link>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {article.author?.designationBn || article.author?.designation || 'স্টাফ রিপোর্টার'}
                  </p>
                </div>
              </div>

              {/* Published & Updated Times */}
              <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:items-end gap-0.5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-newspaper-accent" />
                  <span>প্রকাশ: {formatBanglaDateTime(article.publishedAt || article.createdAt)}</span>
                </div>
                {article.updatedAt && (
                  <span className="text-[11px] text-slate-400">
                    হালনাগাদ: {formatBanglaDateTime(article.updatedAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Social Share Bar */}
            <div className="my-4 flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <ShareButtons url={articleUrl} title={displayTitle} />
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>পড়ার সময়: {toBanglaNumber(article.readTimeMinutes || 3)} মিনিট</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {toBanglaNumber(article.viewsCount || 1)} বার পঠিত
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="my-6">
              <div className="rounded-xl overflow-hidden bg-slate-900 shadow-md aspect-[16/10] sm:aspect-[16/9]">
                <img
                  src={article.featuredImage}
                  alt={displayTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              {(article.imageCaption || article.photographerCredit) && (
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
                  {article.imageCaption && <span>{article.imageCaption}</span>}
                  {article.photographerCredit && (
                    <span className="font-medium text-slate-600 dark:text-slate-300">
                      ছবি: {article.photographerCredit}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Article Content Body (High Readability Bangla Typography, Max-W 820px) */}
            <div
              className="article-content font-editorial my-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Middle In-Article Advertisement */}
            <AdSlot placement="ARTICLE_MIDDLE" />

            {/* Tags List */}
            {tagsList.length > 0 && (
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center flex-wrap gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  ট্যাগ:
                </span>
                {tagsList.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-newspaper-navy hover:text-white dark:hover:bg-blue-600 transition-colors text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Bottom Share Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <ShareButtons url={articleUrl} title={displayTitle} />
            </div>

            {/* Comments Section */}
            <CommentSection
              articleId={article.id}
              initialComments={article.comments.map((c) => ({
                id: c.id,
                name: c.name,
                content: c.content,
                createdAt: c.createdAt,
              }))}
            />
          </article>

          {/* Right Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <AdSlot placement="SIDEBAR" />

            {/* Author Profile Bio Card */}
            {article.author && (
              <div className="bg-slate-50 dark:bg-darkbg-card p-5 rounded-xl border border-slate-200 dark:border-darkbg-border">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  প্রতিবেদক পরিচিতি / Reporter Profile
                </h4>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={article.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                    alt={article.author.nameBn || article.author.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-newspaper-navy"
                  />
                  <div>
                    <h5 className="font-bold text-base text-slate-900 dark:text-white">
                      {article.author.nameBn || article.author.name}
                    </h5>
                    <p className="text-xs text-newspaper-accent font-medium">
                      {article.author.designationBn || article.author.designation}
                    </p>
                  </div>
                </div>
                {article.author.bioBn && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {article.author.bioBn}
                  </p>
                )}
                <Link
                  href={`/author/${article.author.slug}`}
                  className="text-xs font-semibold text-newspaper-blue dark:text-blue-400 hover:underline block text-right"
                >
                  এই প্রতিবেদকের সব সংবাদ পড়ুন →
                </Link>
              </div>
            )}

            {/* Trending & Popular Articles */}
            <MostReadTrendingTabs
              trendingArticles={trendingArticles}
              mostReadArticles={trendingArticles}
            />
          </div>
        </div>

        {/* Related News Section */}
        {relatedArticles.length > 0 && (
          <section className="my-10 pt-8 border-t-2 border-slate-200 dark:border-slate-800">
            <h3 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mb-6">
              আরও পড়ুন — {categoryName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedArticles.map((art) => (
                <NewsCard key={art.id} article={art} showExcerpt={true} />
              ))}
            </div>
          </section>
        )}

        {/* Bottom Ad Slot */}
        <AdSlot placement="ARTICLE_BOTTOM" />
      </main>

      <Footer />
    </div>
  );
}
