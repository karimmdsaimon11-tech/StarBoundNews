import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, Target, Award, Users, HeartHandshake, Eye } from 'lucide-react';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-newspaper-accent mb-2 inline-block">
            আমাদের পরিচিতি / ABOUT US
          </span>
          <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mb-3">
            {SITE_NAME} — {SITE_TAGLINE}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            বাংলাদেশের ডিজিটাল সাংবাদিকতায় সত্যনিষ্ঠা, আধুনিক তথ্যপ্রযুক্তি এবং বস্তুনিষ্ঠতার প্রতীক।
          </p>
        </div>

        <div className="bg-white dark:bg-darkbg-card p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-8 mb-12">
          <div>
            <h2 className="font-headline font-bold text-xl text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-newspaper-accent" />
              আমাদের লক্ষ্য ও দৃষ্টিভঙ্গি (Our Mission & Vision)
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              স্ট্যাটবাউন্ড নিউজের প্রধান উদ্দেশ্য হলো দেশ ও বিদেশের সকল গুরুত্বপূর্ণ ঘটনা দ্রুততম সময়ে, কোনো প্রকার পক্ষপাত বা চাঞ্চল্যকর অতিরঞ্জন ছাড়াই পাঠকদের কাছে তুলে ধরা। আমরা বিশ্বাস করি, একটি সচেতন ও গণতান্ত্রিক সমাজের মূল ভিত্তি হলো সঠিক ও যাচাইকৃত তথ্যের অবাধ প্রবাহ।
            </p>
          </div>

          <div>
            <h2 className="font-headline font-bold text-xl text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-newspaper-blue dark:text-blue-400" />
              সাংবাদিকতার মূলনীতি (Core Editorial Values)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">১. নির্ভুল তথ্য ও যাচাই</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">যেকোনো সংবাদ প্রকাশের পূর্বে একাধিক স্বাধীন সূত্রের মাধ্যমে তথ্য যাচাই করা হয়।</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">২. নিরপেক্ষতা ও স্বচ্ছতা</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">কোনো রাজনৈতিক বা ব্যবসায়িক প্রভাবের বাইরে থেকে সম্পূর্ণ স্বাধীনভাবে সংবাদ পরিবেশন।</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">৩. মানবিক দায়বদ্ধতা</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">গণমানুষের অধিকার, শিক্ষা, স্বাস্থ্য ও পরিবেশ সুরক্ষায় গঠনমূলক অনুসন্ধানী প্রতিবেদন।</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">৪. ডিজিটাল উদ্ভাবন</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">ভিজ্যুয়াল স্টোরিটেলিং ও আধুনিক ডেটা জার্নালিজমে দেশকে নেতৃত্ব দেওয়া।</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
