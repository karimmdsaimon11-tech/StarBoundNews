import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HorizontalNewsCard from '@/components/news/HorizontalNewsCard';
import AdSlot from '@/components/ads/AdSlot';
import Link from 'next/link';
import { User, Mail, ChevronRight, BookOpen, Share2 } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

interface AuthorPageProps {
  params: { slug: string };
}

export const revalidate = 60;

export default async function AuthorProfilePage({ params }: AuthorPageProps) {
  const author = await prisma.author.findUnique({
    where: { slug: params.slug },
    include: {
      articles: {
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        include: { category: true, author: true, district: true },
      },
    },
  }).catch(() => null);

  if (!author) notFound();

  const authorName = author.nameBn || author.name;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:underline">প্রচ্ছদ</Link>
          <ChevronRight className="w-3 h-3" />
          <span>সাংবাদিক ও লেখক প্রোফাইল</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 dark:text-slate-300 font-medium">{authorName}</span>
        </nav>

        {/* Author Bio Header Card */}
        <div className="bg-white dark:bg-darkbg-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
              alt={authorName}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-newspaper-navy dark:border-blue-500 shadow-md flex-shrink-0"
            />

            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-newspaper-accent mb-1 inline-block">
                স্ট্যাটবাউন্ড সাংবাদিক পরিষদ
              </span>
              <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1">
                {authorName}
              </h1>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
                {author.designationBn || author.designation}
              </p>

              {(author.bioBn || author.bio) && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mb-4">
                  {author.bioBn || author.bio}
                </p>
              )}

              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1 font-semibold text-newspaper-navy dark:text-blue-400">
                  <BookOpen className="w-4 h-4" />
                  মোট প্রকাশিত প্রতিবেদন: {toBanglaNumber(author.articles.length)} টি
                </span>
                {author.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {author.email}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-headline font-bold text-xl text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
              {authorName}-এর প্রকাশিত সংবাদ ও প্রতিবেদন
            </h2>

            {author.articles.length === 0 ? (
              <p className="text-sm text-slate-500 py-8">এই লেখকের এখনো কোনো প্রকাশিত প্রতিবেদন নেই।</p>
            ) : (
              author.articles.map((art) => (
                <HorizontalNewsCard key={art.id} article={art} />
              ))
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <AdSlot placement="SIDEBAR" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
