'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Image as ImageIcon, Plus, Trash2, Copy, Check, Search, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Media Modal/Form
  const [showAddModal, setShowAddModal] = useState(false);
  const [url, setUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [caption, setCaption] = useState('');
  const [photographerCredit, setPhotographerCredit] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchMedia = () => {
    fetch(`/api/media${search ? `?q=${encodeURIComponent(search)}` : ''}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setMedia(data.items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, [search]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !filename) return;

    setSaving(true);
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          filename,
          caption,
          photographerCredit,
        }),
      });
      if (res.ok) {
        setUrl('');
        setFilename('');
        setCaption('');
        setPhotographerCredit('');
        setShowAddModal(false);
        fetchMedia();
      }
    } catch {}
    finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('মিডিয়া ফাইলটি মুছে ফেলতে চান?')) {
      try {
        await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
        setMedia(media.filter((m) => m.id !== id));
      } catch {}
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              মিডিয়া লাইব্রেরি / Media Asset Manager
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              সংবাদের ছবি, ব্যানার ও গ্রাফিক্স ফাইল গ্যালারি
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-newspaper-accent text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs self-start"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ছবি যোগ করুন</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white dark:bg-darkbg-card p-3 rounded-xl border border-slate-200 dark:border-darkbg-border">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ছবি খুঁজুন (ফাইলের নাম, ক্যাপশন, ফটোগ্রাফার)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs w-full focus:outline-none dark:text-white"
          />
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
        ) : media.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-darkbg-card rounded-xl border border-dashed border-slate-300 dark:border-darkbg-border">
            <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">কোনো মিডিয়া ফাইল পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500 mt-1">উপরে 'নতুন ছবি যোগ করুন' বাটনে ক্লিক করে ফাইল যুক্ত করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-darkbg-border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.altText || item.filename}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopy(item.id, item.url)}
                      title="URL কপি করুন"
                      className="p-1.5 bg-white/90 text-slate-800 rounded-lg hover:bg-white text-xs font-bold"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="মূল ছবি দেখুন"
                      className="p-1.5 bg-white/90 text-slate-800 rounded-lg hover:bg-white text-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      title="মুছে ফেলুন"
                      className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate" title={item.filename}>
                    {item.filename}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                    {item.photographerCredit || 'StatBound Desk'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-darkbg-card rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-darkbg-border shadow-2xl">
              <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-4">
                নতুন ছবি / মিডিয়া যোগ করুন
              </h3>
              <form onSubmit={handleAddMedia} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ছবির ইমেজ URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ফাইলের নাম / বিবরণ *
                  </label>
                  <input
                    type="text"
                    required
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    placeholder="padma-bridge-inauguration.jpg"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ক্যাপশন (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="পদ্মা সেতুর সংযোগ সড়কে যানবাহনের চাপ..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ফটোগ্রাফার / সূত্র
                  </label>
                  <input
                    type="text"
                    value={photographerCredit}
                    onChange={(e) => setPhotographerCredit(e.target.value)}
                    placeholder="ফোকাস বাংলা / সংগৃহীত"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-darkbg-border">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 text-xs font-bold bg-newspaper-accent text-white rounded-lg hover:bg-newspaper-accent/90 disabled:opacity-50"
                  >
                    {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
