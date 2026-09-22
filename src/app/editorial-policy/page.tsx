import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileText, ShieldCheck, Scale, AlertCircle } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-darkbg-border">
          <span className="text-xs font-bold uppercase tracking-widest text-newspaper-accent mb-1 inline-block">
            সাংবাদিকতার মানদণ্ড / EDITORIAL POLICY
          </span>
          <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            সম্পাদকীয় নীতিমালা ও নৈতিকতার সনদ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            স্ট্যাটবাউন্ড নিউজের বস্তুনিষ্ঠ ও বিশ্বাসযোগ্য সাংবাদিকতা চর্চার দিকনির্দেশনা
          </p>
        </div>

        <div className="bg-white dark:bg-darkbg-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-newspaper-blue dark:text-blue-400" />
              ১. সংবাদ সংগ্রহ ও তথ্য যাচাইয়ের মানদণ্ড
            </h2>
            <p>
              {SITE_NAME}-এ প্রকাশিত প্রতিটি তথ্য অন্তত দুটি স্বাধীন ও নির্ভরযোগ্য সূত্রের মাধ্যমে যাচাই করা আবশ্যক। কোনো অপ্রমাণিত গুজব, অনুমান বা সামাজিক যোগাযোগমাধ্যমের অসত্যায়িত পোস্টকে মূল সংবাদ হিসেবে পরিবেশন করা হয় না।
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Scale className="w-5 h-5 text-newspaper-accent" />
              ২. সূত্রের গোপনীয়তা ও ন্যায্যতা
            </h2>
            <p>
              তথ্যদাতার অনুরোধ ও নিরাপত্তার স্বার্থে অজ্ঞাতনামা সূত্রের পরিচয় সুরক্ষা করা হয়, তবে সূত্রের গ্রহণযোগ্যতা ও উদ্দেশ্য সম্পর্কে সম্পাদকীয় বোর্ড শতভাগ নিশ্চিত থাকে। অভিযুক্ত বা সমালোচিত পক্ষের আত্মপক্ষ সমর্থনের বক্তব্য গ্রহণ করা আবশ্যকীয়।
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              ৩. স্পন্সরড কন্টেন্ট ও সম্পাদকীয় স্বাতন্ত্র্য
            </h2>
            <p>
              বাণিজ্যিক বিজ্ঞাপন ও স্পন্সরড কন্টেন্টকে সুস্পষ্টভাবে "বিজ্ঞাপন" বা "স্পন্সরড" হিসেবে চিহ্নিত করা হয়, যেন সাধারণ পাঠক বিভ্রান্ত না হন। সম্পাদকীয় সিদ্ধান্তে কোনো বাণিজ্যিক অংশীদারের হস্তক্ষেপের সুযোগ নেই।
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              ৪. কৃত্রিম বুদ্ধিমত্তা (AI) ব্যবহারের নীতিমালা
            </h2>
            <p>
              আমরা কোনো প্রকার কৃত্রিম সংবাদ বা মিথ্যা ঘটনা জেনারেট করার জন্য এআই ব্যবহার করি না। যেকোনো প্রযুক্তিগত সহায়ক টুলসের আউটপুট সিনিয়র প্রতিবেদকদের সরাসরি তত্ত্বাবধানে ও সম্পাদকীয় মূল্যায়নের পরই কেবল ব্যবহৃত হতে পারে।
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
