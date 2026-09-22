'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle,
  Clock,
  Flame,
} from 'lucide-react';
import { formatBanglaDateTime, toBanglaNumber } from '@/lib/date';
import DailySyncButton from '@/components/admin/DailySyncButton';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchArticles = () => {
    setLoading(true);
    let url = '/api/articles?limit=50';
    if (selectedStatus) url += `&status=${selectedStatus}`;
    if (selectedCategory) url += `&category=${selectedCategory}`;
    if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) setArticles(data.articles);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [selectedStatus, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`আপনি কি নিশ্চিত যে "${title}" সংবাদটি মুছে ফেলতে চান?`)) {
      try {
        const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setArticles(articles.filter((a) => a.id !== id));
        }
      } catch {
        alert('সংবাদটি মোছা সম্ভব হয়নি।');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              সংবাদ ও প্রতিবেদন ব্যবস্থাপনা / Articles
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              সকল সংবাদ দেখুন, সম্পাদনা করুন, খসড়া তৈরি করুন অথবা নতুন প্রতিবেদন প্রকাশ করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <DailySyncButton />
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-newspaper-accent hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন সংবাদ লিখুন</span>
            </Link>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white dark:bg-darkbg-card p-4 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="শিরোনাম বা কীওয়ার্ড খুঁজুন..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
            >
              <option value="">সকল স্ট্যাটাস (All Status)</option>
              <option value="PUBLISHED">প্রকাশিত (PUBLISHED)</option>
              <option value="DRAFT">খসড়া (DRAFT)</option>
              <option value="PENDING_REVIEW">পর্যালোচনাধীন (PENDING_REVIEW)</option>
              <option value="SCHEDULED">শিডিউল করা (SCHEDULED)</option>
              <option value="ARCHIVED">আর্কাইভড (ARCHIVED)</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
            >
              <option value="">সকল ক্যাটাগরি (All Categories)</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.nameBn} ({c.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-xs text-slate-400">
              সংবাদ তালিকা লোড হচ্ছে...
            </div>
          ) : articles.length === 0 ? (
            <div className="py-20 text-center text-sm text-slate-500">
              কোনো সংবাদ পাওয়া যায়নি।
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">সংবাদ শিরোনাম</th>
                    <th className="py-3 px-3">বিভাগ</th>
                    <th className="py-3 px-3">লেখক</th>
                    <th className="py-3 px-3">স্ট্যাটাস</th>
                    <th className="py-3 px-3">ভিউ</th>
                    <th className="py-3 px-3">প্রকাশ কাল</th>
                    <th className="py-3 px-4 text-right">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100 max-w-sm">
                        <div className="flex items-center gap-2">
                          {art.isBreaking && (
                            <span className="p-1 rounded bg-red-100 dark:bg-red-950/60 text-newspaper-accent text-[10px] font-bold" title="ব্রেকিং নিউজ">
                              <Flame className="w-3 h-3 inline" />
                            </span>
                          )}
                          <Link href={`/admin/articles/${art.id}/edit`} className="hover:text-newspaper-accent line-clamp-1">
                            {art.titleBn || art.title}
                          </Link>
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600 dark:text-slate-400">
                        {art.category?.nameBn || 'সাধারণ'}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600 dark:text-slate-400">
                        {art.author?.nameBn || art.author?.name || 'স্টাফ'}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          art.status === 'PUBLISHED'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : art.status === 'DRAFT'
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {art.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                        {toBanglaNumber(art.viewsCount || 0)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-[11px] text-slate-400">
                        {formatBanglaDateTime(art.publishedAt || art.createdAt)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right space-x-2">
                        <Link
                          href={`/news/${art.slug}`}
                          target="_blank"
                          title="লাইভ সাইটে দেখুন"
                          className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-newspaper-navy inline-block"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/articles/${art.id}/edit`}
                          title="সম্পাদনা করুন"
                          className="p-1.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 inline-block"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(art.id, art.titleBn || art.title)}
                          title="মুছে ফেলুন"
                          className="p-1.5 rounded bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 inline-block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
