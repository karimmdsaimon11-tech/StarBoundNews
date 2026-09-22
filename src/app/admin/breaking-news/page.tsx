'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Flame, Plus, Trash2, Power, Check, ExternalLink } from 'lucide-react';
import { formatBanglaDateTime } from '@/lib/date';

export default function AdminBreakingNewsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [headline, setHeadline] = useState('');
  const [url, setUrl] = useState('');
  const [priority, setPriority] = useState('1');
  const [saving, setSaving] = useState(false);

  const fetchBreaking = () => {
    fetch('/api/breaking-news?all=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setItems(data.items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBreaking();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/breaking-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline, headlineBn: headline, url, priority: parseInt(priority, 10), isActive: true }),
      });
      if (res.ok) {
        setHeadline('');
        setUrl('');
        fetchBreaking();
      }
    } catch {}
    finally {
      setSaving(false);
    }
  };

  const handleToggle = async (item: any) => {
    try {
      await fetch('/api/breaking-news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, isActive: !item.isActive }),
      });
      setItems(items.map((i) => (i.id === item.id ? { ...i, isActive: !i.isActive } : i)));
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (confirm('ব্রেকিং নিউজ আইটেমটি মুছে ফেলতে চান?')) {
      try {
        await fetch(`/api/breaking-news?id=${id}`, { method: 'DELETE' });
        setItems(items.filter((i) => i.id !== id));
      } catch {}
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-4 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 mb-1">
              <Flame className="w-4 h-4 animate-pulse" />
              <span>ব্রেকিং নিউজ টিকারে লাইভ সম্প্রচার</span>
            </div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              ব্রেকিং নিউজ ব্যবস্থাপনা / Breaking Ticker
            </h1>
          </div>
        </div>

        {/* Quick Add Form */}
        <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
          <h2 className="font-headline font-bold text-base text-slate-900 dark:text-white mb-3">
            নতুন ব্রেকিং নিউজ যোগ করুন
          </h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ব্রেকিং হেডলাইন *
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
                placeholder="উদাঃ নতুন আধুনিক শিক্ষা কাঠামো ঘোষণা: সৃজনশীল মূল্যায়নে জোর"
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  সংবাদের লিংক (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="/news/your-article-slug"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  অগ্রাধিকার ক্রম (Priority Order)
                </label>
                <input
                  type="number"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  min={1}
                  max={20}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-newspaper-accent hover:bg-red-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {saving ? 'যুক্ত হচ্ছে...' : 'ব্রেকিং টিকারে যুক্ত করুন'}
            </button>
          </form>
        </div>

        {/* Current Items List */}
        <div className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-white">
            বর্তমান ব্রেকিং নিউজ তালিকা ({items.length})
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.isActive ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.isActive ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Disabled)'}
                    </span>
                    <span className="text-slate-400">অগ্রাধিকার: {item.priority}</span>
                  </div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">{item.headlineBn || item.headline}</p>
                  {item.url && <p className="text-[11px] text-blue-500 mt-0.5">{item.url}</p>}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(item)}
                    title={item.isActive ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                    className={`p-1.5 rounded text-xs font-semibold ${
                      item.isActive ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="মুছে ফেলুন"
                    className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
