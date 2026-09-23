'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploadInput from '@/components/admin/ImageUploadInput';
import { Video, Plus, Trash2, Edit2, Play, ExternalLink, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [duration, setDuration] = useState('03:45');
  const [categoryId, setCategoryId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [vRes, cRes] = await Promise.all([
        fetch('/api/videos'),
        fetch('/api/categories'),
      ]);
      const vData = await vRes.json();
      const cData = await cRes.json();
      if (vData.videos) setVideos(vData.videos);
      if (cData.categories) setCategories(cData.categories);
    } catch {}
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setVideoUrl('');
    setThumbnailUrl('');
    setDuration('03:45');
    setCategoryId(categories[0]?.id || '');
    setIsFeatured(false);
    setShowModal(true);
  };

  const openEdit = (v: any) => {
    setEditingId(v.id);
    setTitle(v.title);
    setSlug(v.slug);
    setVideoUrl(v.videoUrl);
    setThumbnailUrl(v.thumbnailUrl);
    setDuration(v.duration || '03:45');
    setCategoryId(v.categoryId || '');
    setIsFeatured(v.isFeatured || false);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !videoUrl || !thumbnailUrl) return;

    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = {
        id: editingId,
        title,
        titleBn: title,
        slug,
        videoUrl,
        thumbnailUrl,
        duration,
        categoryId: categoryId || null,
        isFeatured,
      };

      const res = await fetch('/api/videos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowModal(false);
        fetchData();
      }
    } catch {}
    finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('ভিডিও সংবাদটি মুছে ফেলতে চান?')) {
      try {
        await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
        setVideos(videos.filter((v) => v.id !== id));
      } catch {}
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              ভিডিও সংবাদ ব্যবস্থাপনা / Video Stories
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              ইউটিউব ও মাল্টিমিডিয়া ভিডিও রিপোর্ট যুক্ত ও পরিচালনা করুন
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-newspaper-accent text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs self-start"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ভিডিও যুক্ত করুন</span>
          </button>
        </div>

        {/* Video Table / Grid */}
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
        ) : videos.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-darkbg-card rounded-xl border border-dashed border-slate-300 dark:border-darkbg-border">
            <Video className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">কোনো ভিডিও সংবাদ নেই</p>
            <p className="text-xs text-slate-500 mt-1">উপরে 'নতুন ভিডিও যুক্ত করুন' বাটনে ক্লিক করে যুক্ত করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-darkbg-border overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-900">
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      {item.duration}
                    </span>
                    {item.isFeatured && (
                      <span className="absolute top-2 left-2 bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    {item.category && (
                      <span className="text-[10px] font-bold text-newspaper-accent dark:text-newspaper-secondary uppercase tracking-wider block mb-1">
                        {item.category.nameBn || item.category.name}
                      </span>
                    )}
                    <h3 className="font-headline font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-darkbg-border flex items-center justify-between">
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-newspaper-accent flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>ভিডিও লিংক</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-newspaper-accent text-xs"
                      title="সম্পাদনা"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-600 hover:text-red-700 text-xs"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-darkbg-card rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-darkbg-border shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-4">
                {editingId ? 'ভিডিও সম্পাদনা করুন' : 'নতুন ভিডিও যুক্ত করুন'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ভিডিওর শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingId) {
                        setSlug(e.target.value.toLowerCase().trim().replace(/[^a-z0-9\u0980-\u09FF]+/g, '-'));
                      }
                    }}
                    placeholder="ঢাকা আন্তর্জাতিক বাণিজ্য মেলার বিশেষ প্রতিবেদন..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    স্লাগ (URL Slug) *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ভিডিও URL (YouTube/Vimeo) *
                  </label>
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div>
                  <ImageUploadInput
                    label="ভিডিও থাম্বনেইল ছবি (Thumbnail Image) *"
                    value={thumbnailUrl}
                    onChange={(url) => setThumbnailUrl(url)}
                    placeholder="https://... বা কম্পিউটার থেকে থাম্বনেইল আপলোড করুন"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      সময়কাল (MM:SS)
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="04:20"
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      ক্যাটাগরি
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                    >
                      <option value="">বাছাই করুন</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameBn} ({c.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFeaturedVideo"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded border-slate-300 text-newspaper-accent focus:ring-newspaper-accent"
                  />
                  <label htmlFor="isFeaturedVideo" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    হোমপেজে ফিচার্ড ভিডিও হিসেবে প্রদর্শন করুন
                  </label>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-darkbg-border">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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
