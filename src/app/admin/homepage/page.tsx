'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  LayoutTemplate,
  Save,
  CheckCircle,
  Eye,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Flame,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SectionConfig {
  id: string;
  name: string;
  nameBn: string;
  type: string;
  isActive: boolean;
  order: number;
}

export default function AdminHomepageLayoutPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [heroArticleId, setHeroArticleId] = useState<string>('');
  const [secondaryIds, setSecondaryIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Default Sections List
  const [sections, setSections] = useState<SectionConfig[]>([
    { id: 'ticker', name: 'Breaking Ticker', nameBn: 'ব্রেকিং নিউজ টিকার', type: 'TICKER', isActive: true, order: 1 },
    { id: 'top_banner', name: 'Top Banner Ad', nameBn: 'শীর্ষ ব্যানার বিজ্ঞাপন', type: 'AD', isActive: true, order: 2 },
    { id: 'hero_grid', name: 'Hero Lead Grid', nameBn: 'প্রধান হিরো নিউজ গ্রিড (১ লিড + ৪ সেকেন্ডারি + লাইভ স্ট্রিম)', type: 'HERO', isActive: true, order: 3 },
    { id: 'hero_ad', name: 'Hero Underlay Ad', nameBn: 'হিরো আন্ডারলে বিজ্ঞাপন', type: 'AD', isActive: true, order: 4 },
    { id: 'national', name: 'National Section', nameBn: 'জাতীয় সংবাদ ব্লক', type: 'CATEGORY', isActive: true, order: 5 },
    { id: 'politics', name: 'Politics Section', nameBn: 'রাজনীতি সংবাদ ব্লক', type: 'CATEGORY', isActive: true, order: 6 },
    { id: 'in_feed_ad', name: 'In-Feed Native Ad', nameBn: 'ফিড মধ্যবর্তী বিজ্ঞাপন', type: 'AD', isActive: true, order: 7 },
    { id: 'opinion', name: 'Opinion Columns', nameBn: 'সম্পাদকীয় কলাম ও মতামত সেকশন', type: 'OPINION', isActive: true, order: 8 },
    { id: 'business', name: 'Business Section', nameBn: 'ব্যবসা ও অর্থনীতি ব্লক', type: 'CATEGORY', isActive: true, order: 9 },
    { id: 'technology', name: 'Technology Section', nameBn: 'তথ্যপ্রযুক্তি ও উদ্ভাবন ব্লক', type: 'CATEGORY', isActive: true, order: 10 },
    { id: 'sports', name: 'Sports Section', nameBn: 'খেলাধুলা সংবাদ ব্লক', type: 'CATEGORY', isActive: true, order: 11 },
    { id: 'entertainment', name: 'Entertainment Section', nameBn: 'বিনোদন ও সংস্কৃতি ব্লক', type: 'CATEGORY', isActive: true, order: 12 },
    { id: 'campus', name: 'Education & Campus', nameBn: 'শিক্ষা ও ক্যাম্পাস ব্লক', type: 'CATEGORY', isActive: true, order: 13 },
    { id: 'multimedia', name: 'Video & Photo Galleries', nameBn: 'ভিডিও ও ফটোগ্যালারি মাল্টিমিডিয়া হাব', type: 'MULTIMEDIA', isActive: true, order: 14 },
    { id: 'footer_ad', name: 'Footer Banner Ad', nameBn: 'ফুটার ব্যানার বিজ্ঞাপন', type: 'AD', isActive: true, order: 15 },
  ]);

  useEffect(() => {
    Promise.all([
      fetch('/api/articles?limit=50').then((r) => r.json()),
      fetch('/api/settings').then((r) => r.json()),
    ])
      .then(([artData, settingsData]) => {
        if (artData.articles) {
          setArticles(artData.articles);
          const hero = artData.articles.find((a: any) => a.isHero);
          if (hero) setHeroArticleId(hero.id);
          else if (artData.articles[0]) setHeroArticleId(artData.articles[0].id);

          const sec = artData.articles
            .filter((a: any) => a.id !== (hero?.id || artData.articles[0]?.id))
            .slice(0, 4)
            .map((a: any) => a.id);
          setSecondaryIds(sec);
        }

        if (settingsData.map && settingsData.map.homepage_sections) {
          try {
            const parsed = JSON.parse(settingsData.map.homepage_sections);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setSections(parsed);
            }
          } catch {}
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    setSections(updated.map((s, idx) => ({ ...s, order: idx + 1 })));
  };

  const toggleSection = (id: string) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleHeroChange = (id: string) => {
    setHeroArticleId(id);
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    try {
      // 1. Save Hero Article flag
      if (heroArticleId) {
        await Promise.all(
          articles.map((a) => {
            const isHero = a.id === heroArticleId;
            if (a.isHero !== isHero) {
              return fetch(`/api/articles/${a.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isHero }),
              });
            }
            return Promise.resolve();
          })
        );
      }

      // 2. Save Section Layout to SiteSettings
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: {
            homepage_sections: JSON.stringify(sections),
            homepage_hero_id: heroArticleId,
          },
        }),
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {}
    finally {
      setSaving(false);
    }
  };

  const selectedHero = articles.find((a) => a.id === heroArticleId);

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-newspaper-accent mb-1">
              <LayoutTemplate className="w-4 h-4" />
              <span>হোমপেজ ভিজ্যুয়াল কাস্টমাইজার</span>
            </div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              হোমপেজ লেআউট ও লিড স্টোরি এডিটর / Homepage CMS
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              প্রচ্ছদের প্রধান লিড নিউজ, সেকেন্ডারি খবর এবং বিভিন্ন সেকশনের ক্রম ও প্রদর্শন নিয়ন্ত্রণ করুন।
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-darkbg-border bg-white dark:bg-darkbg-card text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>লাইভ প্রচ্ছদ দেখুন</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-newspaper-accent text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'লেআউট পরিবর্তন সেভ করুন'}</span>
            </button>
          </div>
        </div>

        {success && (
          <div className="bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 p-4 rounded-xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>হোমপেজ লেআউট ও লিড স্টোরি সফলভাবে সংরক্ষিত ও আপডেট হয়েছে!</span>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 6 Cols: Lead Hero Story Picker */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-darkbg-border">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-newspaper-accent" />
                    <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                      প্রধান লিড স্টোরি নির্বাচন (Hero Story)
                    </h3>
                  </div>
                  <span className="text-[10px] bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400 font-bold px-2 py-0.5 rounded">
                    #১ প্রধান খবর
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  হোমপেজের মূল ব্যানারে সবচেয়ে বড় করে যে সংবাদটি প্রদর্শিত হবে তা বাছাই করুন:
                </p>

                <select
                  value={heroArticleId}
                  onChange={(e) => handleHeroChange(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-accent"
                >
                  {articles.map((art) => (
                    <option key={art.id} value={art.id}>
                      [{art.category?.nameBn || art.category?.name}] {art.titleBn || art.title}
                    </option>
                  ))}
                </select>

                {/* Hero Preview Card */}
                {selectedHero && (
                  <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900">
                      <Image
                        src={selectedHero.featuredImage}
                        alt={selectedHero.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-newspaper-accent text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {selectedHero.category?.nameBn || 'জাতীয়'}
                      </span>
                    </div>

                    <h4 className="font-headline font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                      {selectedHero.titleBn || selectedHero.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {selectedHero.excerpt}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60 dark:border-darkbg-border">
                      <span>লেখক: {selectedHero.author?.nameBn || 'স্টাফ রিপোর্টার'}</span>
                      <Link
                        href={`/admin/articles/${selectedHero.id}/edit`}
                        className="text-newspaper-accent hover:underline font-bold"
                      >
                        সংবাদটি সম্পাদনা করুন →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 6 Cols: Homepage Sections Reorder & Toggle */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-darkbg-border">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-newspaper-accent" />
                    <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                      সেকশন সমূহের ক্রম ও প্রদর্শন বিন্যাস
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    মোট {sections.length} টি সেকশন
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  যেকোনো সেকশন উপরে/নিচে স্থানান্তর করতে তীরচিহ্নে ক্লিক করুন অথবা সক্রিয়/নিষ্ক্রিয় করুন:
                </p>

                <div className="space-y-2">
                  {sections.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                        sec.isActive
                          ? 'bg-white dark:bg-darkbg-card border-slate-200 dark:border-darkbg-border'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-dashed border-slate-300 dark:border-slate-700 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-[10px] font-mono">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            {sec.nameBn}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {sec.name} ({sec.type})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Up / Down Reorder */}
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveSection(idx, 'up')}
                            className="p-1 text-slate-600 dark:text-slate-300 hover:text-newspaper-accent disabled:opacity-20"
                            title="উপরে নিন"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === sections.length - 1}
                            onClick={() => moveSection(idx, 'down')}
                            className="p-1 text-slate-600 dark:text-slate-300 hover:text-newspaper-accent disabled:opacity-20"
                            title="নিচে নিন"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Toggle Active */}
                        <button
                          type="button"
                          onClick={() => toggleSection(sec.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                            sec.isActive
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                              : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          {sec.isActive ? 'সক্রিয়' : 'বন্ধ'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
