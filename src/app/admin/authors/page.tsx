'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Users, Plus, Mail, BookOpen } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';
import Link from 'next/link';

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [designationBn, setDesignationBn] = useState('');
  const [email, setEmail] = useState('');
  const [bioBn, setBioBn] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80');

  const fetchAuthors = () => {
    fetch('/api/authors')
      .then((r) => r.json())
      .then((d) => {
        if (d.authors) setAuthors(d.authors);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nameBn, designationBn, email, bioBn, avatar }),
      });
      if (res.ok) {
        setShowAdd(false);
        fetchAuthors();
      }
    } catch {}
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-4 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              সাংবাদিক ও কলামিস্ট ব্যবস্থাপনা / Authors
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              প্রতিবেদক, কলামিস্ট ও সম্পাদকীয় পরিষদের প্রোফাইল নিয়ন্ত্রণ।
            </p>
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-newspaper-accent text-white text-xs font-semibold shadow-xs hover:bg-red-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন সাংবাদিক যুক্ত করুন</span>
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleCreate} className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">নতুন সাংবাদিক প্রোফাইল</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">ইংরেজি নাম *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">বাংলা নাম *</label>
                <input
                  type="text"
                  required
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="উদাঃ তানভীর আহমেদ"
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">পদবী (Designation in Bangla)</label>
                <input
                  type="text"
                  value={designationBn}
                  onChange={(e) => setDesignationBn(e.target.value)}
                  placeholder="উদাঃ স্টাফ রিপোর্টার / বিশেষ প্রতিনিধি"
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">ইমেইল</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reporter@statbound.com"
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">সংক্ষিপ্ত পরিচিতি (Bio)</label>
              <textarea
                rows={2}
                value={bioBn}
                onChange={(e) => setBioBn(e.target.value)}
                placeholder="সাংবাদিকের অভিজ্ঞতা ও বিট বিষয়ক তথ্য..."
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <button type="submit" className="px-5 py-2 rounded bg-newspaper-accent text-white font-semibold hover:bg-red-700">
              প্রোফাইল তৈরি করুন
            </button>
          </form>
        )}

        {/* Authors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {authors.map((author) => (
            <div
              key={author.id}
              className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                    alt={author.nameBn || author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-newspaper-navy flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                      {author.nameBn || author.name}
                    </h3>
                    <p className="text-xs text-newspaper-accent font-medium">
                      {author.designationBn || author.designation}
                    </p>
                  </div>
                </div>

                {author.bioBn && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {author.bioBn}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-newspaper-navy dark:text-blue-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  {toBanglaNumber(author._count?.articles || 0)} প্রতিবেদন
                </span>
                <Link href={`/author/${author.slug}`} target="_blank" className="hover:underline text-[11px]">
                  প্রোফাইল →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
