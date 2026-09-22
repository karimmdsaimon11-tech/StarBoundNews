import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Shield, Lock } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-darkbg-border">
          <span className="text-xs font-bold uppercase tracking-widest text-newspaper-accent mb-1 inline-block">
            গোপনীয়তা সুরক্ষা / PRIVACY POLICY
          </span>
          <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            গোপনীয়তা ও ডেটা সুরক্ষা নীতি
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            পাঠক ও ব্যবহারকারীদের ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা বজায় রাখতে আমাদের নীতিমালা
          </p>
        </div>

        <div className="bg-white dark:bg-darkbg-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2">
              ১. তথ্য সংগ্রহ ও ব্যবহার
            </h2>
            <p>
              {SITE_NAME} পাঠকদের কাছ থেকে শুধুমাত্র নিউজলেটার সাবস্ক্রিপশন, মন্তব্য এবং যোগাযোগ ফর্মের মাধ্যমে নাম ও ইমেইল সংগ্রহ করে। আমরা কোনো অননুমোদিত উপায়ে সংবেদনশীল ডেটা সংগ্রহ বা তৃতীয় পক্ষের কাছে বিক্রি করি না।
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2">
              ২. কুকি (Cookies) ও অ্যানালিটিক্স
            </h2>
            <p>
              ওয়েবসাইটের পারফরম্যান্স ও পড়ার অভিজ্ঞতা উন্নত করার জন্য আমরা কুকি ও অ্যানালিটিক্স ব্যবহার করি। পাঠক যেকোনো সময় ব্রাউজার সেটিংস থেকে কুকি নিষ্ক্রিয় করতে পারেন।
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
