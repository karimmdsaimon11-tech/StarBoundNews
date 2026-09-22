'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, CheckCircle2, Send } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full text-center">
        <div className="w-16 h-16 rounded-full bg-newspaper-navy/10 dark:bg-blue-900/30 text-newspaper-navy dark:text-blue-400 mx-auto flex items-center justify-center mb-6 shadow-xs">
          <Mail className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-newspaper-accent mb-2 inline-block">
          দৈনিক বুলেটিন / DAILY NEWSLETTER
        </span>
        <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mb-3">
          স্ট্যাটবাউন্ড নিউজলেটার সাবস্ক্রাইব করুন
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
          প্রতিদিন সকাল ও সন্ধ্যায় দিনের সবচেয়ে গুরুত্বপূর্ণ ও আলোচিত খবরের নিরপেক্ষ সারসংক্ষেপ সরাসরি আপনার ইনবক্সে।
        </p>

        <div className="bg-white dark:bg-darkbg-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border shadow-md max-w-md mx-auto">
          {submitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">সাবস্ক্রিপশন সম্পন্ন হয়েছে!</h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                স্ট্যাটবাউন্ড নিউজের দৈনিক বুলেটিনে স্বাগতম। আপনি যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  আপনার নাম (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="উদাঃ কাজী নজরুল"
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ইমেইল ঠিকানা *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="yourname@domain.com"
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-newspaper-navy hover:bg-newspaper-blue text-white text-xs font-semibold transition-colors shadow-sm disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'যুক্ত হচ্ছে...' : 'সাবস্ক্রাইব করুন'}</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
