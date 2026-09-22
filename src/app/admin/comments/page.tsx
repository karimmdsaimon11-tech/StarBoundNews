'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { MessageSquare, Check, X, Flag, Trash2, ExternalLink } from 'lucide-react';
import { formatBanglaDateTime } from '@/lib/date';
import Link from 'next/link';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchComments = () => {
    setLoading(true);
    let url = '/api/comments';
    if (statusFilter) url += `?status=${statusFilter}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.comments) setComments(data.comments);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchComments();
  }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setComments(comments.map((c) => (c.id === id ? { ...c, status } : c)));
      }
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (confirm('মন্তব্যটি মুছে ফেলতে চান?')) {
      try {
        await fetch(`/api/comments?id=${id}`, { method: 'DELETE' });
        setComments(comments.filter((c) => c.id !== id));
      } catch {}
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-4 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              পাঠক মন্তব্য মডারেশন কিউ / Comments Moderation
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              পাঠকদের পাঠানো মন্তব্য অনুমোদন করুন, নীতিমালার আলোকে ফিল্টার বা বাতিল করুন।
            </p>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="">সকল মন্তব্য (All)</option>
            <option value="PENDING">অপেক্ষমাণ (PENDING)</option>
            <option value="APPROVED">অনুমোদিত (APPROVED)</option>
            <option value="REJECTED">প্রত্যাখ্যাত (REJECTED)</option>
            <option value="FLAGGED">ফ্ল্যাগ করা (FLAGGED)</option>
          </select>
        </div>

        {/* Comments Queue */}
        <div className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-xs text-slate-400">মন্তব্য লোড হচ্ছে...</div>
          ) : comments.length === 0 ? (
            <div className="py-20 text-center text-sm text-slate-500">কোনো মন্তব্য পাওয়া যায়নি।</div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {comments.map((comment) => (
                <div key={comment.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {comment.name}
                      </span>
                      <span className="text-xs text-slate-400">({comment.email})</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        comment.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : comment.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {comment.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 my-2 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                      "{comment.content}"
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{formatBanglaDateTime(comment.createdAt)}</span>
                      {comment.article && (
                        <>
                          <span>•</span>
                          <Link href={`/news/${comment.article.slug}`} target="_blank" className="text-newspaper-blue hover:underline">
                            সংবাদ: {comment.article.title}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateStatus(comment.id, 'APPROVED')}
                      title="অনুমোদন করুন"
                      className="px-3 py-1.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>অনুমোদন</span>
                    </button>

                    <button
                      onClick={() => updateStatus(comment.id, 'REJECTED')}
                      title="বাতিল করুন"
                      className="px-3 py-1.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>বাতিল</span>
                    </button>

                    <button
                      onClick={() => handleDelete(comment.id)}
                      title="মুছে ফেলুন"
                      className="p-1.5 rounded text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
