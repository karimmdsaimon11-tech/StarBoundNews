'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, ArrowLeft, Trash2, History, ExternalLink, Flame } from 'lucide-react';
import { formatBanglaDateTime } from '@/lib/date';

interface EditArticlePageProps {
  params: { id: string };
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [versions, setVersions] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    titleBn: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    content: '',
    featuredImage: '',
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
      fetch(`/api/articles/${params.id}`).then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
      fetch('/api/authors').then((r) => r.json()),
      fetch('/api/districts').then((r) => r.json()),
    ])
      .then(([artData, catsData, authorsData, distsData]) => {
        if (catsData.categories) setCategories(catsData.categories);
        if (authorsData.authors) setAuthors(authorsData.authors);
        if (distsData.districts) setDistricts(distsData.districts);

        if (artData.article) {
          const a = artData.article;
          setFormData({
            title: a.title || '',
            titleBn: a.titleBn || '',
            slug: a.slug || '',
            subtitle: a.subtitle || '',
            excerpt: a.excerpt || '',
            content: a.content || '',
            featuredImage: a.featuredImage || '',
            imageCaption: a.imageCaption || '',
            photographerCredit: a.photographerCredit || '',
            categoryId: a.categoryId || '',
            subcategoryId: a.subcategoryId || '',
            authorId: a.authorId || '',
            districtId: a.districtId || '',
            tags: a.tags || '',
            status: a.status || 'PUBLISHED',
            isHero: Boolean(a.isHero),
            isFeatured: Boolean(a.isFeatured),
            isTrending: Boolean(a.isTrending),
            isBreaking: Boolean(a.isBreaking),
            isOpinion: Boolean(a.isOpinion),
            seoTitle: a.seoTitle || '',
            seoDescription: a.seoDescription || '',
            focusKeyword: a.focusKeyword || '',
            canonicalUrl: a.canonicalUrl || '',
            scheduledAt: a.scheduledAt ? a.scheduledAt.slice(0, 16) : '',
          });
          if (a.versions) setVersions(a.versions);
        }
      })
      .catch((err) => setError('সংবাদ লোড করতে ব্যর্থ হয়েছে'))
      .finally(() => setLoading(false));
  }, [params.id]);

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
    setError('');
    setSaving(true);

    try {
      const res = await fetch(`/api/articles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('আপডেট করতে ব্যর্থ হয়েছে');

      router.push('/admin/articles');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'একটি ত্রুটি ঘটেছে');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-xs text-slate-400">
          সংবাদের বিস্তারিত তথ্য লোড হচ্ছে...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
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
                সংবাদ সম্পাদনা / Edit Article
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                আইডি: {params.id} — স্লাগ: /news/{formData.slug}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/news/${formData.slug}`}
              target="_blank"
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>লাইভ দেখুন</span>
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 px-6 py-2 rounded-lg bg-newspaper-accent hover:bg-red-700 text-white text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'হালনাগাদ করুন'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                সংবাদ শিরোনাম (Main Headline) *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full text-base font-headline font-bold px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  উপ-শিরোনাম (Subheadline)
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  সংক্ষিপ্ত সারসংক্ষেপ (Excerpt)
                </label>
                <textarea
                  rows={2}
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                সংবাদের মূল বিবরণ (Article Body) *
              </label>
              <textarea
                rows={14}
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full font-mono text-xs px-3.5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            {/* Version History Log */}
            {versions.length > 0 && (
              <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <History className="w-4 h-4 text-newspaper-navy dark:text-blue-400" />
                  <h3 className="font-headline font-bold text-sm text-slate-900 dark:text-white">
                    সম্পাদনা ইতিহাস ও ভার্শন লগ (Revision History)
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {versions.map((v) => (
                    <div key={v.id} className="py-2 flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">ভার্শন {v.version}</span>
                        <span className="ml-2">— সম্পাদক: {v.editorName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{formatBanglaDateTime(v.createdAt)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-4">
              <h3 className="font-headline font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                স্ট্যাটাস নিয়ন্ত্রণ
              </h3>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="PUBLISHED">প্রকাশিত (PUBLISHED)</option>
                <option value="DRAFT">খসড়া (DRAFT)</option>
                <option value="PENDING_REVIEW">পর্যালোচনাধীন (PENDING_REVIEW)</option>
                <option value="SCHEDULED">শিডিউল (SCHEDULED)</option>
                <option value="ARCHIVED">আর্কাইভড (ARCHIVED)</option>
              </select>
            </div>

            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-3">
              <h3 className="font-headline font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                শ্রেণীবিভাগ
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  বিভাগ *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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
                  লেখক
                </label>
                <select
                  name="authorId"
                  value={formData.authorId}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nameBn || a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-2.5">
              <h3 className="font-headline font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                ফ্ল্যাগ সেটিংস
              </h3>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isBreaking"
                  checked={formData.isBreaking}
                  onChange={handleChange}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span className="text-red-600">ব্রেকিং নিউজ</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isHero"
                  checked={formData.isHero}
                  onChange={handleChange}
                  className="rounded text-newspaper-navy focus:ring-newspaper-blue w-4 h-4"
                />
                <span>হোমপেজ প্রধান সংবাদ</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="rounded text-newspaper-navy focus:ring-newspaper-blue w-4 h-4"
                />
                <span>ফিচার সংবাদ</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
