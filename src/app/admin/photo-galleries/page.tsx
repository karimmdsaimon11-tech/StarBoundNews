'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploadInput from '@/components/admin/ImageUploadInput';
import { Camera, Plus, Trash2, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function AdminPhotoGalleriesPage() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [photographerCredit, setPhotographerCredit] = useState('');
  const [imageUrls, setImageUrls] = useState(['', '', '']);
  const [saving, setSaving] = useState(false);

  const fetchGalleries = () => {
    fetch('/api/photo-galleries')
      .then((res) => res.json())
      .then((data) => {
        if (data.galleries) setGalleries(data.galleries);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const openAdd = () => {
    setTitle('');
    setSlug('');
    setDescription('');
    setCoverImage('');
    setPhotographerCredit('StatBound Photo Desk');
    setImageUrls(['', '', '']);
    setShowModal(true);
  };

  const handleImageUrlChange = (index: number, val: string) => {
    const next = [...imageUrls];
    next[index] = val;
    setImageUrls(next);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !coverImage) return;

    setSaving(true);
    try {
      const validImages = imageUrls
        .filter((url) => url.trim().length > 0)
        .map((url, i) => ({ imageUrl: url.trim(), order: i }));

      const res = await fetch('/api/photo-galleries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          titleBn: title,
          slug,
          description,
          coverImage,
          photographerCredit,
          images: validImages,
        }),
      });

      if (res.ok) {
        setShowModal(false);
        fetchGalleries();
      }
    } catch {}
    finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('ফটো অ্যালবামটি মুছে ফেলতে চান?')) {
      try {
        await fetch(`/api/photo-galleries?id=${id}`, { method: 'DELETE' });
        setGalleries(galleries.filter((g) => g.id !== id));
      } catch {}
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              ফটো গ্যালারি ও চিত্রসংবাদ / Photo Stories
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              চিত্রপ্রতিবেদন ও ছবিভিত্তিক সংবাদের অ্যালবাম পরিচালনা
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-newspaper-accent text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs self-start"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ফটো অ্যালবাম</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
        ) : galleries.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-darkbg-card rounded-xl border border-dashed border-slate-300 dark:border-darkbg-border">
            <Camera className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">কোনো ফটো অ্যালবাম নেই</p>
            <p className="text-xs text-slate-500 mt-1">উপরে 'নতুন ফটো অ্যালবাম' বাটনে ক্লিক করে যুক্ত করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleries.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-darkbg-border overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-900">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/75 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1.5">
                      <ImageIcon className="w-3 h-3" />
                      <span>{item.images?.length || 1} ছবি</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-slate-400 font-semibold mb-1">
                      ছবি: {item.photographerCredit || 'StatBound Desk'}
                    </p>
                    <h3 className="font-headline font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-darkbg-border flex items-center justify-between">
                  <a
                    href={`/photo-gallery/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-newspaper-accent flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>সাইটে দেখুন</span>
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-600 hover:text-red-700 text-xs"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-darkbg-card rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-darkbg-border shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-4">
                নতুন ফটো অ্যালবাম তৈরি করুন
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    অ্যালবামের শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setSlug(e.target.value.toLowerCase().trim().replace(/[^a-z0-9\u0980-\u09FF]+/g, '-'));
                    }}
                    placeholder="নয়নাভিরাম সাজেক ভ্যালি: পাহাড় ও মেঘের দেশে..."
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
                  <ImageUploadInput
                    label="অ্যালবাম কভার ছবি (Cover Photo) *"
                    value={coverImage}
                    onChange={(url) => setCoverImage(url)}
                    placeholder="https://... বা কম্পিউটার থেকে কভার ছবি আপলোড করুন"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ফটোগ্রাফার ক্রেডিট
                  </label>
                  <input
                    type="text"
                    value={photographerCredit}
                    onChange={(e) => setPhotographerCredit(e.target.value)}
                    placeholder="আসিফ রহমান / বিশেষ আলোকচিত্রী"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    সংক্ষিপ্ত বিবরণ
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ছবির অ্যালবামের পটভূমি..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      গ্যালারির ছবির লিঙ্কসমূহ
                    </label>
                    <button
                      type="button"
                      onClick={addImageField}
                      className="text-[10px] font-bold text-newspaper-accent hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> আরও লিঙ্ক যোগ করুন
                    </button>
                  </div>
                  <div className="space-y-2">
                    {imageUrls.map((url, idx) => (
                      <input
                        key={idx}
                        type="url"
                        value={url}
                        onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                        placeholder={`ছবি ${idx + 1} URL (https://...)`}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                      />
                    ))}
                  </div>
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
