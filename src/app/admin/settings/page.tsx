'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploadInput from '@/components/admin/ImageUploadInput';
import {
  Settings,
  Save,
  CheckCircle2,
  Globe,
  Shield,
  Bell,
  Sliders,
  Code,
  FileText,
  Mail,
  Phone,
  MapPin,
  Flame,
  ExternalLink,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'branding' | 'header' | 'footer' | 'ads' | 'policy'>('branding');

  const [settings, setSettings] = useState<Record<string, string>>({
    // Branding
    siteName: 'StatBound News',
    siteNameBn: 'স্টেটবাউন্ড নিউজ',
    tagline: 'প্রতিদিনের খবর, নির্ভরযোগ্য তথ্য',
    taglineEn: 'Daily News, Trusted Information',
    editorInChief: 'সম্পাদক ও প্রকাশক: আহমেদ ফয়সাল',
    foundingYear: '২০২৪',
    govtRegNo: 'রেজিস্ট্রেশন নং: ডিএইচ-৯৮৭২/২০২৪',
    logoText: 'STATBOUND NEWS',

    // TopBar & Header
    topAnnouncementText: 'জরুরি বার্তা: সত্য ও দায়িত্বশীল সাংবাদিকতায় স্ট্যাটবাউন্ড নিউজের সাথে থাকুন।',
    showTopAnnouncement: 'true',
    weatherInfo: 'ঢাকা ২৮° সে. / চট্টগ্রাম ২৯° সে.',
    epaperUrl: 'https://epaper.statbound.com',
    liveTvUrl: 'https://youtube.com/@statboundnews/live',

    // Contact & Office
    officeAddress: 'বাণিজ্যিক ভবন (লেভেল ৭), আগ্রাবাদ, চট্টগ্রাম / কাওরান বাজার, ঢাকা, বাংলাদেশ',
    chattogramBureau: 'জিইসি মোড়, সিডিএ এভিনিউ, চট্টগ্রাম',
    sylhetBureau: 'জিন্দাবাজার, সিলেট',
    contactPhone: '+৮৮০ ১৭০০-০০০০০০, +৮৮০ ২-৯৮৭৬৫৪৩',
    faxNumber: '+৮৮০ ২-৯৮৭৬৫৪৪',
    contactEmail: 'news@statbound.com',
    editorEmail: 'editor@statbound.com',
    adEmail: 'advertise@statbound.com',

    // Social Links
    facebookUrl: 'https://facebook.com/statboundnews',
    twitterUrl: 'https://twitter.com/statboundnews',
    youtubeUrl: 'https://youtube.com/@statboundnews',
    linkedinUrl: 'https://linkedin.com/company/statboundnews',
    instagramUrl: 'https://instagram.com/statboundnews',
    whatsappNumber: '+8801700000000',

    // Footer & Legal
    copyrightText: '© ২০২৬ সর্বস্বত্ব সংরক্ষিত — স্টেটবাউন্ড নিউজ (StatBound News Ltd.)',
    editorialPolicyBlurb: 'স্ট্যাটবাউন্ড নিউজ নিরপেক্ষ ও বস্তুনিষ্ঠ সাংবাদিকতায় দায়বদ্ধ। কোনো সংবাদের প্রতিবাদ বা সংশোধনী জানাতে ইমেইল করুন: corrections@statbound.com',

    // Ads & Scripts
    enableAdSlots: 'true',
    googleAnalyticsId: 'G-STATBOUND123',
    facebookPixelId: '',
    headerCustomScripts: '<!-- Global Header Analytics/Ad Script -->',

    // Moderation & Rules
    autoApproveComments: 'false',
    breakingNewsAutoExpireHours: '24',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.map) {
          setSettings((prev) => ({ ...prev, ...data.map }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch {}
    finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-newspaper-accent mb-1">
              <Settings className="w-4 h-4" />
              <span>ওয়েবসাইট মাস্টার কন্ট্রোল</span>
            </div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              পুরো ওয়েবসাইট এডিটর ও কনফিগারেশন / Site Customizer
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              পত্রিকার ব্র্যান্ডিং, হেডার, ফুটার, ঠিকানা, সোশ্যাল লিংক, বিজ্ঞাপন ও পলিসি এক জায়গা থেকেই নিয়ন্ত্রণ করুন।
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 bg-newspaper-accent text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সেভ করুন'}</span>
            </button>
          </div>
        </div>

        {success && (
          <div className="bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 p-4 rounded-xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>সকল সেটিংস সফলভাবে সংরক্ষিত হয়েছে এবং ওয়েবসাইটে প্রয়োগ করা হয়েছে!</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'branding'
                ? 'bg-white dark:bg-darkbg-card text-newspaper-accent dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>১. ব্র্যান্ডিং ও পরিচয়</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('header')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'header'
                ? 'bg-white dark:bg-darkbg-card text-newspaper-accent dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>২. হেডার ও টপবার নোটিশ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('footer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'footer'
                ? 'bg-white dark:bg-darkbg-card text-newspaper-accent dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>৩. ফুটার, ঠিকানা ও যোগাযোগ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ads'
                ? 'bg-white dark:bg-darkbg-card text-newspaper-accent dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>৪. বিজ্ঞাপন ও কোড স্ক্রিপ্ট</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('policy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'policy'
                ? 'bg-white dark:bg-darkbg-card text-newspaper-accent dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>৫. এডিটরিয়াল ও মডারেশন</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tab 1: Branding */}
            {activeTab === 'branding' && (
              <div className="bg-white dark:bg-darkbg-card p-6 rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-xs space-y-4 animate-in fade-in">
                <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-darkbg-border">
                  <Globe className="w-4 h-4 text-newspaper-accent" />
                  পত্রিকার নাম, স্লোগান ও ব্র্যান্ড পরিচয়
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ImageUploadInput
                      label="পত্রিকার অফিসিয়াল লোগো (Site Logo Image)"
                      value={settings.siteLogo || ''}
                      onChange={(url) => handleChange('siteLogo', url)}
                      placeholder="https://... বা সরাসরি লোগো আপলোড করুন"
                      aspectRatio="auto"
                      helperText="পিএনজি বা স্বচ্ছ ব্যাকগ্রাউন্ডের লোগো ব্যবহার করা উত্তম।"
                    />
                  </div>

                  <div>
                    <ImageUploadInput
                      label="ওয়েবসাইট ফেভিকন (Favicon / App Icon)"
                      value={settings.siteFavicon || ''}
                      onChange={(url) => handleChange('siteFavicon', url)}
                      placeholder="https://... বা ফেভিকন আপলোড করুন"
                      aspectRatio="square"
                      helperText="স্কয়ার সাইজ (৩২x৩২ বা ৬৪x৬৪) আইকন।"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      পত্রিকার নাম (বাংলায়) *
                    </label>
                    <input
                      type="text"
                      value={settings.siteNameBn || ''}
                      onChange={(e) => handleChange('siteNameBn', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      পত্রিকার নাম (ইংরেজিতে) *
                    </label>
                    <input
                      type="text"
                      value={settings.siteName || ''}
                      onChange={(e) => handleChange('siteName', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      প্রধান ট্যাগলাইন (বাংলা) *
                    </label>
                    <input
                      type="text"
                      value={settings.tagline || ''}
                      onChange={(e) => handleChange('tagline', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      ট্যাগলাইন (English)
                    </label>
                    <input
                      type="text"
                      value={settings.taglineEn || ''}
                      onChange={(e) => handleChange('taglineEn', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      সম্পাদক ও প্রকাশক পরিচিতি লাইন *
                    </label>
                    <input
                      type="text"
                      value={settings.editorInChief || ''}
                      onChange={(e) => handleChange('editorInChief', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      প্রতিষ্ঠার বছর
                    </label>
                    <input
                      type="text"
                      value={settings.foundingYear || ''}
                      onChange={(e) => handleChange('foundingYear', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      সরকারি রেজিস্ট্রেশন নং / স্বীকৃতি
                    </label>
                    <input
                      type="text"
                      value={settings.govtRegNo || ''}
                      onChange={(e) => handleChange('govtRegNo', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Header & TopBar */}
            {activeTab === 'header' && (
              <div className="bg-white dark:bg-darkbg-card p-6 rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-xs space-y-4 animate-in fade-in">
                <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-darkbg-border">
                  <Bell className="w-4 h-4 text-newspaper-accent" />
                  হেডার, টপবার ও লাইভ নোটিশ কন্ট্রোল
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      শীর্ষ টপবার জরুরি নোটিশ / ঘোষণা
                    </label>
                    <input
                      type="text"
                      value={settings.topAnnouncementText || ''}
                      onChange={(e) => handleChange('topAnnouncementText', e.target.value)}
                      placeholder="জরুরি বার্তা: ..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        আবহাওয়ার শহর ও তাপমাত্রা টেক্সট
                      </label>
                      <input
                        type="text"
                        value={settings.weatherInfo || ''}
                        onChange={(e) => handleChange('weatherInfo', e.target.value)}
                        placeholder="ঢাকা ২৮° সে. / চট্টগ্রাম ২৯° সে."
                        className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        ই-পেপার (E-Paper) লিংক
                      </label>
                      <input
                        type="url"
                        value={settings.epaperUrl || ''}
                        onChange={(e) => handleChange('epaperUrl', e.target.value)}
                        placeholder="https://epaper.statbound.com"
                        className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        লাইভ টিভি / অডিও সম্প্রচার স্ট্রিম লিংক
                      </label>
                      <input
                        type="url"
                        value={settings.liveTvUrl || ''}
                        onChange={(e) => handleChange('liveTvUrl', e.target.value)}
                        placeholder="https://youtube.com/@statboundnews/live"
                        className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Footer & Contacts */}
            {activeTab === 'footer' && (
              <div className="bg-white dark:bg-darkbg-card p-6 rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-xs space-y-4 animate-in fade-in">
                <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-darkbg-border">
                  <MapPin className="w-4 h-4 text-newspaper-accent" />
                  ফুটার, অফিস ঠিকানা, যোগাযোগ ও সামাজিক মাধ্যম
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      প্রধান কার্যালয় ঠিকানা *
                    </label>
                    <input
                      type="text"
                      value={settings.officeAddress || ''}
                      onChange={(e) => handleChange('officeAddress', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      চট্টগ্রাম ব্যুরো অফিস
                    </label>
                    <input
                      type="text"
                      value={settings.chattogramBureau || ''}
                      onChange={(e) => handleChange('chattogramBureau', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      সিলেট ব্যুরো অফিস
                    </label>
                    <input
                      type="text"
                      value={settings.sylhetBureau || ''}
                      onChange={(e) => handleChange('sylhetBureau', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      যোগাযোগ ফোন / হটলাইন *
                    </label>
                    <input
                      type="text"
                      value={settings.contactPhone || ''}
                      onChange={(e) => handleChange('contactPhone', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      নিউজ ডেস্ক ইমেইল *
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail || ''}
                      onChange={(e) => handleChange('contactEmail', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      বিজ্ঞাপন বিভাগ ইমেইল
                    </label>
                    <input
                      type="email"
                      value={settings.adEmail || ''}
                      onChange={(e) => handleChange('adEmail', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      সম্পাদকীয় ইমেইল
                    </label>
                    <input
                      type="email"
                      value={settings.editorEmail || ''}
                      onChange={(e) => handleChange('editorEmail', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  {/* Social links */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      value={settings.facebookUrl || ''}
                      onChange={(e) => handleChange('facebookUrl', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      value={settings.youtubeUrl || ''}
                      onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Twitter / X URL
                    </label>
                    <input
                      type="url"
                      value={settings.twitterUrl || ''}
                      onChange={(e) => handleChange('twitterUrl', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      WhatsApp নম্বর
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber || ''}
                      onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      ফুটার কপিরাইট টেক্সট
                    </label>
                    <input
                      type="text"
                      value={settings.copyrightText || ''}
                      onChange={(e) => handleChange('copyrightText', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Ads & Scripts */}
            {activeTab === 'ads' && (
              <div className="bg-white dark:bg-darkbg-card p-6 rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-xs space-y-4 animate-in fade-in">
                <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-darkbg-border">
                  <Code className="w-4 h-4 text-newspaper-accent" />
                  বিজ্ঞাপন মনিটাইজেশন ও ট্র্যাকিং কোড ইন্টিগ্রেশন
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-slate-800/50">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        সাইটব্যাপী বিজ্ঞাপন স্লট মাস্টার সুইচ (Enable Ad Slots)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        বন্ধ করলে সাইটের সকল বিজ্ঞাপন প্রদর্শন সাময়িকভাবে স্থগিত থাকবে।
                      </p>
                    </div>

                    <select
                      value={settings.enableAdSlots || 'true'}
                      onChange={(e) => handleChange('enableAdSlots', e.target.value)}
                      className="px-3 py-1.5 text-xs font-bold border border-slate-300 dark:border-darkbg-border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="true">চালু (Enabled)</option>
                      <option value="false">বন্ধ (Disabled)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Google Analytics Measurement ID
                      </label>
                      <input
                        type="text"
                        value={settings.googleAnalyticsId || ''}
                        onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                        placeholder="G-XXXXXXX"
                        className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Facebook Pixel ID
                      </label>
                      <input
                        type="text"
                        value={settings.facebookPixelId || ''}
                        onChange={(e) => handleChange('facebookPixelId', e.target.value)}
                        placeholder="1234567890"
                        className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      কাস্টম হেডার কোড স্ক্রিপ্ট (Google AdSense / Verification Meta)
                    </label>
                    <textarea
                      rows={4}
                      value={settings.headerCustomScripts || ''}
                      onChange={(e) => handleChange('headerCustomScripts', e.target.value)}
                      placeholder="<script async src='https://pagead2.googlesyndication.com...'></script>"
                      className="w-full p-3 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Policy & Moderation */}
            {activeTab === 'policy' && (
              <div className="bg-white dark:bg-darkbg-card p-6 rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-xs space-y-4 animate-in fade-in">
                <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-darkbg-border">
                  <Shield className="w-4 h-4 text-newspaper-accent" />
                  এডিটরিয়াল পলিসি ও পাঠক মন্তব্য নিয়মাবলী
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-slate-800/50">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        পাঠক মন্তব্য স্বয়ংক্রিয় প্রকাশ (Auto-Approve Comments)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        বন্ধ থাকলে যেকোনো নতুন মন্তব্য মডারেশন কিউতে জমা হবে এবং সম্পাদকের অনুমোদনের পর প্রকাশিত হবে।
                      </p>
                    </div>

                    <select
                      value={settings.autoApproveComments || 'false'}
                      onChange={(e) => handleChange('autoApproveComments', e.target.value)}
                      className="px-3 py-1.5 text-xs font-bold border border-slate-300 dark:border-darkbg-border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="false">ম্যানুয়াল মডারেশন (প্রস্তাবিত)</option>
                      <option value="true">স্বয়ংক্রিয় প্রকাশ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      ব্রেকিং নিউজ টিকার এক্সপায়ারি সময় (ঘণ্টা)
                    </label>
                    <input
                      type="number"
                      value={settings.breakingNewsAutoExpireHours || '24'}
                      onChange={(e) => handleChange('breakingNewsAutoExpireHours', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      সংশোধনী ও বস্তুনিষ্ঠতা নীতিমালার সংক্ষিপ্ত বিবরণ
                    </label>
                    <textarea
                      rows={3}
                      value={settings.editorialPolicyBlurb || ''}
                      onChange={(e) => handleChange('editorialPolicyBlurb', e.target.value)}
                      className="w-full p-3 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save Bar */}
            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-darkbg-border">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-newspaper-accent text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'সকল সেটিংস সংরক্ষণ ও প্রয়োগ করুন'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
