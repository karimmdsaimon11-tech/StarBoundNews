'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FolderTree, Plus, Trash2, Edit } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [slug, setSlug] = useState('');
  const [color, setColor] = useState('#1E3E62');

  const fetchCats = () => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => {
        if (d.categories) setCategories(d.categories);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nameBn, slug, color }),
      });
      if (res.ok) {
        setName('');
        setNameBn('');
        setSlug('');
        setShowAdd(false);
        fetchCats();
      }
    } catch {}
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-4 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              সংবাদ বিভাগ ও ক্যাটাগরি ব্যবস্থাপনা / Categories
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              সকল সংবাদ বিভাগ নিয়ন্ত্রণ করুন ও নতুন ক্যাটাগরি তৈরি করুন।
            </p>
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-newspaper-accent text-white text-xs font-semibold shadow-xs hover:bg-red-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ক্যাটাগরি</span>
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleCreate} className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">নতুন ক্যাটাগরি ফরম</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold mb-1">ইংরেজি নাম (English Name) *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Science"
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">বাংলা নাম (Bangla Name) *</label>
                <input
                  type="text"
                  required
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="উদাঃ বিজ্ঞান"
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">রঙ (Brand Color)</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-9 p-1 rounded border border-slate-300 dark:border-slate-700"
                />
              </div>
            </div>

            <button type="submit" className="px-5 py-2 rounded bg-newspaper-accent text-white font-semibold hover:bg-red-700">
              সংরক্ষণ করুন
            </button>
          </form>
        )}

        {/* Categories List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color || '#1E3E62' }} />
                <div>
                  <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                    {cat.nameBn}
                  </h3>
                  <span className="text-xs text-slate-400">/{cat.slug}</span>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {toBanglaNumber(cat._count?.articles || 0)} সংবাদ
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
