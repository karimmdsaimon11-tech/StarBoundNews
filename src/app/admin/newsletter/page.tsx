'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Mail, Trash2, Download, Search, CheckCircle2, XCircle } from 'lucide-react';
import { formatBanglaDate } from '@/lib/date';

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchSubscribers = () => {
    fetch('/api/newsletter')
      .then((res) => res.json())
      .then((data) => {
        if (data.subscribers) setSubscribers(data.subscribers);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleToggleStatus = async (sub: any) => {
    const nextStatus = sub.status === 'ACTIVE' ? 'UNSUBSCRIBED' : 'ACTIVE';
    try {
      await fetch('/api/newsletter', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sub.id, status: nextStatus }),
      });
      setSubscribers(subscribers.map((s) => (s.id === sub.id ? { ...s, status: nextStatus } : s)));
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (confirm('সাবস্ক্রাইবার তালিকা থেকে মুছে ফেলতে চান?')) {
      try {
        await fetch(`/api/newsletter?id=${id}`, { method: 'DELETE' });
        setSubscribers(subscribers.filter((s) => s.id !== id));
      } catch {}
    }
  };

  const exportCSV = () => {
    const header = 'Email,Name,Status,SubscribedAt\n';
    const rows = subscribers
      .map((s) => `"${s.email}","${s.name || ''}","${s.status}","${s.subscribedAt}"`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `statbound_newsletter_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name && s.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              নিউজলেটার গ্রাহক তালিকা / Newsletter Subscribers
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              মোট সাবস্ক্রাইবার: <span className="font-bold text-newspaper-accent font-mono">{subscribers.length}</span> জন
            </p>
          </div>
          <button
            onClick={exportCSV}
            disabled={subscribers.length === 0}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs disabled:opacity-50 self-start"
          >
            <Download className="w-4 h-4" />
            <span>CSV ফাইল এক্সপোর্ট</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 bg-white dark:bg-darkbg-card p-3 rounded-xl border border-slate-200 dark:border-darkbg-border">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ইমেইল বা নাম দিয়ে খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs w-full focus:outline-none dark:text-white"
          />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-darkbg-border shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-xs">
              <Mail className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              কোনো সাবস্ক্রাইবার পাওয়া যায়নি।
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-darkbg-border font-semibold">
                  <tr>
                    <th className="p-3.5">গ্রাহকের ইমেইল</th>
                    <th className="p-3.5">নাম</th>
                    <th className="p-3.5">স্ট্যাটাস</th>
                    <th className="p-3.5">নিবন্ধন তারিখ</th>
                    <th className="p-3.5 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-darkbg-border">
                  {filtered.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 font-mono text-slate-900 dark:text-white font-medium">
                        {sub.email}
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400">
                        {sub.name || '—'}
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleStatus(sub)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            sub.status === 'ACTIVE'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          {sub.status === 'ACTIVE' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> সক্রিয়
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" /> নিষ্ক্রিয়
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-3.5 text-slate-500 dark:text-slate-400">
                        {formatBanglaDate(sub.subscribedAt)}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
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
