import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AlertTriangle, RefreshCw, Mail } from 'lucide-react';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';

export default function CorrectionsPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-darkbg-border">
          <span className="text-xs font-bold uppercase tracking-widest text-newspaper-accent mb-1 inline-block">
            সংশোধনী নীতিমালা / CORRECTION POLICY
          </span>
          <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            ভুল সংশোধন ও পরিমার্জন নীতিমালা
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            স্বচ্ছতা ও সত্যনিষ্ঠা রক্ষায় তাৎক্ষণিক সংশোধন প্রকাশে আমাদের অঙ্গীকার
          </p>
        </div>

        <div className="bg-white dark:bg-darkbg-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-newspaper-navy dark:text-blue-400" />
              ১. ভুলের তাৎক্ষণিক স্বীকৃতি
            </h2>
            <p>
              {SITE_NAME} কোনো ভুল বা তথ্যগত বিভ্রান্তি ধরা পড়লে তা ধামাচাপা না দিয়ে দ্রুততম সময়ে সংশোধন করে। সংশোধনকৃত সংবাদের নিচে বা সংশ্লিষ্ট অংশে সুস্পষ্টভাবে "সংশোধনী / Correction Notice" উল্লেখ করা হয়।
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              ২. পাঠকের অভিযোগ ও সংশোধন অনুরোধ প্রক্রিয়া
            </h2>
            <p>
              যেকোনো পাঠক, ব্যক্তি বা প্রতিষ্ঠান যদি কোনো সংবাদে তথ্যগত অসঙ্গতি লক্ষ্য করেন, তবে উপযুক্ত প্রমাণসহ আমাদের সম্পাদকীয় ডেস্কে ইমেইল করতে পারেন: <strong className="text-newspaper-navy dark:text-blue-400">{CONTACT_INFO.email}</strong>। আমাদের ফ্যাক্ট-চেক টিম ২৪ ঘণ্টার মধ্যে বিষয়টি পুনর্মূল্যায়ন করে কার্যকর ব্যবস্থা গ্রহণ করে।
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
