'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle, Shield, Award, FileText } from 'lucide-react';
import { SITE_NAME, SITE_TAGLINE, MAIN_CATEGORIES, DISTRICTS_LIST, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        setSubscribed(true);
        setEmail('');
      } catch {
        setSubscribed(true);
      }
    }
  };

  return (
    <footer className="bg-newspaper-navy text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black tracking-tight text-2xl text-white uppercase">
                  STATBOUND
                </span>
                <span className="font-serif font-light text-2xl text-newspaper-accent">
                  NEWS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">
                {SITE_TAGLINE}
              </p>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              স্ট্যাটবাউন্ড নিউজ বাংলাদেশের একটি আধুনিক, নিরপেক্ষ ও বস্তুনিষ্ঠ ডিজিটাল সংবাদপত্র। সত্য, নির্ভুল ও তাৎক্ষণিক সংবাদ পরিবেশনে আমরা সর্বদাই দায়বদ্ধ।
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-newspaper-accent flex-shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-newspaper-accent flex-shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-newspaper-accent flex-shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Main Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-newspaper-accent pl-2">
              প্রধান বিভাগ
            </h4>
            <ul className="space-y-2 text-xs">
              {MAIN_CATEGORIES.slice(0, 7).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="hover:text-white transition-colors">
                    {c.nameBn} ({c.name})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: More Categories & Districts */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-newspaper-accent pl-2">
              অন্যান্য বিভাগ
            </h4>
            <ul className="space-y-2 text-xs">
              {MAIN_CATEGORIES.slice(7, 14).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="hover:text-white transition-colors">
                    {c.nameBn} ({c.name})
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/district" className="hover:text-white transition-colors font-medium text-amber-400">
                  জেলা সংবাদ (সকল জেলা) →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Policies */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-newspaper-accent pl-2">
              দৈনিক বুলেটিন
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              প্রতিদিনের গুরুত্বপূর্ণ খবরের সারসংক্ষেপ আপনার ইমেইলে পেতে সাবস্ক্রাইব করুন।
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-700 rounded text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>সাবস্ক্রিপশন সম্পন্ন হয়েছে!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল ঠিকানা..."
                    required
                    className="w-full text-xs px-3 py-2 rounded bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded bg-newspaper-accent text-white hover:bg-red-700 transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 pt-4 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <Link href="/editorial-policy" className="block hover:text-white transition-colors">
                • সম্পাদকীয় নীতিমালা (Editorial Policy)
              </Link>
              <Link href="/corrections-policy" className="block hover:text-white transition-colors">
                • সংশোধনী নীতিমালা (Corrections)
              </Link>
              <Link href="/advertise" className="block hover:text-white transition-colors text-amber-400">
                • বিজ্ঞাপন দিন (Advertise)
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {SITE_NAME}. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link href="/about" className="hover:text-white transition-colors">আমাদের সম্পর্কে</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">যোগাযোগ</Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">গোপনীয়তা নীতি</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">ব্যবহারের শর্তাবলী</Link>
            <span>•</span>
            <Link href="/rss.xml" className="hover:text-white transition-colors">RSS ফিড</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
