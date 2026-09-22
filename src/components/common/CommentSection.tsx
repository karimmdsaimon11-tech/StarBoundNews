'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatBanglaDateTime } from '@/lib/date';

interface CommentItem {
  id: string;
  name: string;
  content: string;
  createdAt: string | Date;
}

interface CommentSectionProps {
  articleId: string;
  initialComments: CommentItem[];
}

export function CommentSection({ articleId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !content.trim()) {
      setError('অনুগ্রহ করে নাম, ইমেইল এবং মন্তব্যের বিবরণ পূরণ করুন।');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, name, email, content }),
      });

      if (!res.ok) {
        throw new Error('মন্তব্য জমা দেওয়া সম্ভব হয়নি।');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setContent('');
    } catch (err: any) {
      setError(err.message || 'একটি ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-newspaper-navy dark:text-blue-400" />
        <h3 className="text-xl font-bold font-headline text-newspaper-navy dark:text-white">
          মন্তব্য ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-lg border border-slate-200 dark:border-slate-800 mb-8">
        <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">
          আপনার মূল্যবান মতামত প্রকাশ করুন
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          আপনার ইমেইল ঠিকানা অপ্রকাশিত থাকবে। নীতিমালা পরিপন্থী মন্তব্য অনুমোদিত হবে না।
        </p>

        {submitted ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-md text-emerald-800 dark:text-emerald-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold">আপনার মন্তব্যটি সফলভাবে জমা হয়েছে!</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                সম্পাদকীয় পর্যালোচনার পর আপনার মন্তব্য প্রকাশিত হবে। ধন্যবাদ।
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  আপনার পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="উদাঃ জাহিদুল ইসলাম"
                  required
                  className="w-full text-sm px-3.5 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ইমেইল ঠিকানা *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@domain.com"
                  required
                  className="w-full text-sm px-3.5 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                মন্তব্য *
              </label>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="এখানে আপনার গঠনমূলক মতামত লিখুন..."
                required
                className="w-full text-sm px-3.5 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2 rounded text-xs font-semibold text-white bg-newspaper-navy hover:bg-newspaper-blue dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'জমা হচ্ছে...' : 'মন্তব্য পাঠান'}
            </button>
          </form>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 italic">
            এই প্রতিবেদনে এখনো কোনো মন্তব্য প্রকাশিত হয়নি। প্রথম মন্তব্যটি করুন আপনি!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  {comment.name}
                </span>
                <span className="text-xs text-slate-400">
                  {formatBanglaDateTime(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
export default CommentSection;
