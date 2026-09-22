'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CONTACT_INFO, SITE_NAME } from '@/lib/constants';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setError('অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন।');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', name, email, phone, subject, message }),
      });

      if (!res.ok) throw new Error('বার্তা পাঠাতে সমস্যা হয়েছে।');

      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-newspaper-accent mb-2 inline-block">
            যোগাযোগ / CONTACT US
          </span>
          <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mb-2">
            স্ট্যাটবাউন্ড নিউজের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            যেকোনো সংবাদ বিজ্ঞপ্তি, মতামত, জিজ্ঞাসা বা অভিযোগের জন্য আমাদের বার্তা পাঠান।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-darkbg-card p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-lg bg-newspaper-navy/10 dark:bg-blue-900/30 text-newspaper-navy dark:text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">কার্যালয়ের ঠিকানা</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-darkbg-card p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-lg bg-newspaper-accent/10 text-newspaper-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">টেলিফোন ও হটলাইন</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {CONTACT_INFO.phone}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">সকাল ৯টা থেকে রাত ১১টা পর্যন্ত</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-darkbg-card p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">ইমেইল যোগাযোগ</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">নিউজডেস্ক: {CONTACT_INFO.email}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">সম্পাদক: {CONTACT_INFO.editorEmail}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">বিজ্ঞাপন: {CONTACT_INFO.adEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Working Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-darkbg-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
            <h2 className="font-headline font-bold text-xl text-slate-900 dark:text-white mb-1">
              সরাসরি বার্তা পাঠান
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              আপনার বার্তাটি সংশ্লিষ্ট ডেস্কে সরাসরি পৌঁছে যাবে।
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-600" />
                <div>
                  <h4 className="font-bold text-base">আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1 leading-relaxed">
                    স্ট্যাটবাউন্ড নিউজের সাথে যোগাযোগের জন্য ধন্যবাদ। আমাদের প্রতিনিধি দ্রুততম সময়ে আপনার সাথে যোগাযোগ করবেন।
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-emerald-700 underline"
                  >
                    আরেকটি বার্তা পাঠান
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="উদাঃ কাজী নজরুল ইসলাম"
                      className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
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
                      className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      বিষয় *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder="উদাঃ প্রেস রিলিজ / তথ্য সংশোধন"
                      className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    বার্তার বিবরণ *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="আপনার বিস্তারিত বার্তা এখানে লিখুন..."
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-newspaper-navy hover:bg-newspaper-blue text-white text-xs font-semibold transition-colors disabled:opacity-50 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
