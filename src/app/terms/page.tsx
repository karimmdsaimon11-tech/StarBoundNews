import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_NAME } from '@/lib/constants';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-darkbg-border">
          <span className="text-xs font-bold uppercase tracking-widest text-newspaper-accent mb-1 inline-block">
            ব্যবহারের শর্তাবলী / TERMS & CONDITIONS
          </span>
          <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            ব্যবহারের সাধারণ শর্তাবলী
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            স্ট্যাটবাউন্ড নিউজ ব্যবহারের নিয়ম ও স্বত্বাধিকার বিষয়ক নির্দেশনাবলী
          </p>
        </div>

        <div className="bg-white dark:bg-darkbg-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2">
              ১. কপিরাইট ও কনটেন্ট পুনঃব্যবহার
            </h2>
            <p>
              {SITE_NAME}-এ প্রকাশিত সকল সংবাদ, আলোকচিত্র, গ্রাফিক্স ও ভিডিও আমাদের নিজস্ব বা অনুমোদিত উৎস থেকে সংগৃহীত। অনুমতি ব্যতীত কোনো কনটেন্ট বাণিজ্যিক উদ্দেশ্যে নকল, পরিবর্তন বা হুবহু পুনর্প্রকাশ আইনত দণ্ডনীয়। তবে যথাযথ ক্রেডিট ও মূল সংবাদের হাইপারলিংক প্রদান সাপেক্ষে শিক্ষামূলক ও অলাভজনক উদ্ধৃতি দেওয়া যাবে।
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2">
              ২. মন্তব্য প্রকাশের নিয়মাবলী
            </h2>
            <p>
              পাঠকদের গঠনমূলক মতামতকে আমরা স্বাগত জানাই। তবে কোনো প্রকার অশ্লীল, ধর্মীয় অনুভূতিতে আঘাতকারী, আক্রমণাত্মক বা মানহানিকর মন্তব্য অনুমোদিত হবে না।
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
