'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Megaphone, BarChart3, Target, Award, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, SITE_NAME } from '@/lib/constants';

export default function AdvertisePage() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [placement, setPlacement] = useState('HOMEPAGE_HERO');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !email || !message) {
      setError('অনুগ্রহ করে প্রয়োজনীয় তথ্য পূরণ করুন।');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ad',
          companyName,
          contactPerson,
          email,
          phone,
          placement,
          budget,
          message,
        }),
      });

      if (!res.ok) throw new Error('বিজ্ঞাপন রিকুয়েস্ট জমা নেওয়া সম্ভব হয়নি।');

      setSubmitted(true);
      setCompanyName('');
      setContactPerson('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'একটি ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-newspaper-accent mb-2 inline-block">
            ডিজিটাল বিজ্ঞাপন / ADVERTISE WITH US
          </span>
          <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mb-3">
            স্ট্যাটবাউন্ড নিউজে বিজ্ঞাপন দিন — আপনার ব্র্যান্ড পৌঁছে দিন লাখো পাঠকের কাছে
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            বাংলাদেশের সর্বাধিক প্রতিশ্রুতিশীল ও দ্রুত বর্ধনশীল ডিজিটাল সংবাদপত্রে উচ্চ মানসম্পন্ন ডিসপ্লে, ইন-ফিড ও স্পন্সরড কন্টেন্ট ক্যাম্পেইন পরিচালনা করুন।
          </p>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-darkbg-card p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-newspaper-navy/10 text-newspaper-navy dark:text-blue-400 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white mb-2">
              উচ্চ পাঠক এনগেজমেন্ট
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              শিক্ষিত, নীতিনির্ধারক, পেশাজীবী ও তরুণ প্রজন্মের পাঠকদের কাছে আপনার ব্র্যান্ডের সর্বোচ্চ ভিউ ও ক্লিক থ্রু রেট।
            </p>
          </div>

          <div className="bg-white dark:bg-darkbg-card p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-newspaper-accent/10 text-newspaper-accent flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white mb-2">
              টার্গেটেড প্লেসমেন্ট
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              হোমপেজ ব্যানার, আর্টিকেল ইন-ফিড, সাইডবার, মোবাইল স্টিকি ও নির্দিষ্ট ক্যাটাগরিভিত্তিক কাস্টম প্লেসমেন্ট সুবিধা।
            </p>
          </div>

          <div className="bg-white dark:bg-darkbg-card p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white mb-2">
              স্বচ্ছ রিয়েল-টাইম রিপোর্ট
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              কোনো প্রকার ফেক ইমপ্রেশন ছাড়া স্বচ্ছ ও নির্ভুল ক্যাম্পেইন ডেটা ও বিস্তারিত অ্যানালিটিক্স রিপোর্ট প্রদান।
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white dark:bg-darkbg-card p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border shadow-md max-w-3xl mx-auto">
          <h2 className="font-headline font-bold text-2xl text-slate-900 dark:text-white mb-1 text-center">
            বিজ্ঞাপনের তথ্য বা রেটকার্ডের জন্য রিকুয়েস্ট পাঠান
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 text-center">
            আমাদের বিজনেস অ্যান্ড মনিটাইজেশন টিম ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-600" />
              <div>
                <h4 className="font-bold text-base">আপনার বিজ্ঞাপন রিকুয়েস্টটি জমা হয়েছে!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1 leading-relaxed">
                  স্ট্যাটবাউন্ড নিউজ বিজনেস টিম খুব শীঘ্রই আপনার ইমেইল ও ফোনে রেটকার্ড ও মিডিয়া কিট সরবরাহ করবে।
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-emerald-700 underline"
                >
                  আরেকটি তথ্য পাঠান
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 text-xs rounded">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    প্রতিষ্ঠান / ব্র্যান্ডের নাম *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="উদাঃ বাংলা টেলিকম লিমিটেড"
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    যোগাযোগকারীর নাম *
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    required
                    placeholder="উদাঃ শরীফুল হাসান"
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    অফিসিয়াল ইমেইল *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="marketing@company.com"
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+৮৮০ ১৭০০-০০০০০০"
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    আগ্রহী বিজ্ঞাপনের প্লেসমেন্ট
                  </label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                  >
                    <option value="HOMEPAGE_HERO">হোমপেজ প্রধান ব্যানার (Homepage Hero)</option>
                    <option value="TOP_BANNER">শীর্ষ ব্যানার (Top Banner)</option>
                    <option value="HEADER">হেডার ব্যানার (Header Ad)</option>
                    <option value="IN_FEED">ইন-ফিড নেটিভ বিজ্ঞাপন (In-Feed)</option>
                    <option value="ARTICLE_TOP">আর্টিকেল ভেতরের ব্যানার (In-Article)</option>
                    <option value="SIDEBAR">সাইডবার ব্যানার (Sidebar Sticky)</option>
                    <option value="SPONSORED">স্পন্সরড কন্টেন্ট / পিআর (Sponsored Article)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    আনুমানিক বাজেট (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="উদাঃ ৫০,০০০ - ১,০০,০০০ টাকা"
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ক্যাম্পেইনের বিবরণ / প্রয়োজনীয় তথ্য *
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="আপনার ক্যাম্পেইনের সময়কাল ও লক্ষ্যমাত্রা সংক্ষেপে লিখুন..."
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-newspaper-navy hover:bg-newspaper-blue text-white text-xs font-semibold transition-colors disabled:opacity-50 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'পাঠানো হচ্ছে...' : 'বিজ্ঞাপন রিকুয়েস্ট জমা দিন'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
