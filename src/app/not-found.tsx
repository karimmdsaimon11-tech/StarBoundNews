import React from 'react';
import Link from 'next/link';
import { FileQuestion, ArrowLeft, Home, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-950/50 text-newspaper-accent flex items-center justify-center mb-6 shadow-xs">
          <FileQuestion className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-newspaper-accent mb-2">
          ত্রুটি ৪০৪ / ERROR 404
        </span>

        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white mb-3">
          এই পাতায় কোনো সংবাদ খুঁজে পাওয়া যায়নি
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
          সম্ভবত খবরটি স্থানান্তর করা হয়েছে অথবা লিংকটি পরিবর্তিত হয়েছে। আপনি প্রচ্ছদে ফিরে যেতে পারেন অথবা অন্য কোনো সংবাদ অনুসন্ধান করতে পারেন।
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-newspaper-navy text-white text-sm font-semibold hover:bg-newspaper-blue transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>প্রচ্ছদে ফিরে যান</span>
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-xs"
          >
            <Search className="w-4 h-4" />
            <span>সংবাদ অনুসন্ধান করুন</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
