'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, ArrowLeft, Image as ImageIcon, Sparkles, Flame, Eye, Globe } from 'lucide-react';

export default function NewArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    titleBn: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    imageCaption: '',
    photographerCredit: '',
    categoryId: '',
    subcategoryId: '',
    authorId: '',
    districtId: '',
    tags: '',
    status: 'PUBLISHED',
    isHero: false,
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    isOpinion: false,
    seoTitle: '',
    seoDescription: '',
    focusKeyword: '',
    canonicalUrl: '',
    scheduledAt: '',
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then((r) => r.json()),
      fetch('/api/authors').then((r) => r.json()),
      fetch('/api/districts').then((r) => r.json()),
    ])
      .then(([catsData, authorsData, distsData]) => {
        if (catsData.categories) {
          setCategories(catsData.categories);
          if (catsData.categories.length > 0) {
            setFormData((prev) => ({ ...prev, categoryId: catsData.categories[0].id }));
          }
        }
        if (authorsData.authors) {
          setAuthors(authorsData.authors);
          if (authorsData.authors.length > 0) {
            setFormData((prev) => ({ ...prev, authorId: authorsData.authors[0].id }));
          }
        }
        if (distsData.districts) {
          setDistricts(distsData.districts);
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.categoryId) {
      setError('অনুগ্রহ করে শিরোনাম, বিষয়বস্তু ও ক্যাটাগরি পূরণ করুন।');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'সংবাদ প্রকাশে সমস্যা হয়েছে।');
      }

      router.push('/admin/articles');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'একটি ত্রুটি ঘটেছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
                নতুন সংবাদ তৈরি ও প্রকাশনা / New Article
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                তথ্যবহুল সংবাদ লিখুন এবং প্রযোজ্য বিভাগ ও অপশন নির্বাচন করুন।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-newspaper-accent hover:bg-red-700 text-white text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'সংরক্ষণ হচ্ছে...' : 'সংবাদ প্রকাশ করুন'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Editor Fields (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Title (Bengali / Primary) */}
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                সংবাদ শিরোনাম (বাংলা / Main Headline) *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="উদাঃ নতুন আধুনিক শিক্ষা কাঠামো ঘোষণা: প্রাথমিক ও মাধ্যমিকে সৃজনশীল মূল্যায়নে জোর"
                className="w-full text-base font-headline font-bold px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
              />
            </div>

            {/* Subtitle / Excerpt */}
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  উপ-শিরোনাম (Subheadline / Standfirst)
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="উদাঃ আগামী শিক্ষাবর্ষ থেকেই প্রাথমিক ও মাধ্যমিকে নতুন পাঠ্যসূচি কার্যকর হচ্ছে"
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  সংক্ষিপ্ত সারসংক্ষেপ (Excerpt / Summary)
                </label>
                <textarea
                  rows={2}
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="হোমপেজ ও সোশ্যাল মিডিয়া শেয়ার প্রিভিউয়ের জন্য সংবাদের প্রথম অনুচ্ছেদ বা মূল বক্তব্য..."
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                />
              </div>
            </div>

            {/* Rich Content Editor */}
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                সংবাদের মূল বিবরণ (HTML / Full Article Body) *
              </label>
              <textarea
                rows={14}
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="<p>সংবাদের প্রথম অনুচ্ছেদ এখানে শুরু হবে...</p>

<h3>উপশিরোনাম</h3>
<p>বিস্তারিত তথ্য ও উদ্ধৃতি...</p>

<blockquote>'গুরুত্বপূর্ণ উক্তি'</blockquote>"
                className="w-full font-mono text-xs px-3.5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                প্যারাগ্রাফের জন্য &lt;p&gt;, সাবহেডিংয়ের জন্য &lt;h3&gt;, কোটেশনের জন্য &lt;blockquote&gt; ব্যবহার করতে পারেন।
              </p>
            </div>

            {/* Featured Image Box */}
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-3">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                ফিচার ইমেজ ও ছবির ক্যাপশন (Featured Image & Caption)
              </label>
              <input
                type="text"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                placeholder="ইমেজ URL (https://...)"
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="imageCaption"
                  value={formData.imageCaption}
                  onChange={handleChange}
                  placeholder="ছবির ক্যাপশন (Caption)"
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                />
                <input
                  type="text"
                  name="photographerCredit"
                  value={formData.photographerCredit}
                  onChange={handleChange}
                  placeholder="ফটোগ্রাফার ক্রেডিট (Credit)"
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Publishing Controls & Meta Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Publishing Status & Schedule */}
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-4">
              <h3 className="font-headline font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                প্রকাশনা নিয়ন্ত্রণ / Publish Status
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  স্ট্যাটাস
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="PUBLISHED">সরাসরি প্রকাশ (PUBLISHED)</option>
                  <option value="DRAFT">খসড়া হিসেবে সংরক্ষণ (DRAFT)</option>
                  <option value="PENDING_REVIEW">পর্যালোচনাধীন (PENDING_REVIEW)</option>
                  <option value="SCHEDULED">শিডিউল প্রকাশ (SCHEDULED)</option>
                  <option value="ARCHIVED">আর্কাইভড (ARCHIVED)</option>
                </select>
              </div>

              {formData.status === 'SCHEDULED' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    শিডিউল তারিখ ও সময় (BST)
                  </label>
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    value={formData.scheduledAt}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Category, Author & District Select */}
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-3">
              <h3 className="font-headline font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                শ্রেণীবিভাগ ও প্রতিবেদক
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  সংবাদ বিভাগ (Category) *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameBn} ({c.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  প্রতিবেদক / লেখক (Author)
                </label>
                <select
                  name="authorId"
                  value={formData.authorId}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nameBn || a.name} — {a.designationBn || a.designation}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  জেলা (ঐচ্ছিক / District)
                </label>
                <select
                  name="districtId"
                  value={formData.districtId}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="">কোনো নির্দিষ্ট জেলা নেই (সারাদেশ)</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nameBn} ({d.divisionBn} বিভাগ)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ট্যাগসমূহ (কমা দিয়ে লিখুন)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="উদাঃ শিক্ষা, ঢাকা, বিশ্ববিদ্যালয়, প্রযুক্তি"
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Display Feature Toggles */}
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-2.5">
              <h3 className="font-headline font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                হোমপেজ প্রদর্শন ফ্ল্যাগ
              </h3>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isBreaking"
                  checked={formData.isBreaking}
                  onChange={handleChange}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span className="text-red-600 dark:text-red-400">ব্রেকিং নিউজ টিকারে যুক্ত করুন</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isHero"
                  checked={formData.isHero}
                  onChange={handleChange}
                  className="rounded text-newspaper-navy focus:ring-newspaper-blue w-4 h-4"
                />
                <span>হোমপেজ প্রধান সংবাদ (Hero Story)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="rounded text-newspaper-navy focus:ring-newspaper-blue w-4 h-4"
                />
                <span>বিশেষ ফিচার সংবাদ (Featured)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isOpinion"
                  checked={formData.isOpinion}
                  onChange={handleChange}
                  className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                <span>মতামত ও সম্পাদকীয় কলাম (Opinion)</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
