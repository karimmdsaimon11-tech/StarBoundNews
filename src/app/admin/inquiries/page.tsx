'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Inbox, Mail, Phone, DollarSign, Trash2, CheckCircle2, MessageSquare, Eye } from 'lucide-react';
import { formatBanglaDateTime } from '@/lib/date';

export default function AdminInquiriesPage() {
  const [tab, setTab] = useState<'contact' | 'ad'>('contact');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const fetchInquiries = () => {
    setLoading(true);
    fetch(`/api/inquiries?type=${tab}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.inquiries) setInquiries(data.inquiries);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInquiries();
  }, [tab]);

  const handleToggleRead = async (inq: any) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inq.id, isRead: !inq.isRead, type: tab }),
      });
      if (res.ok) {
        setInquiries(inquiries.map((i) => (i.id === inq.id ? { ...i, isRead: !inq.isRead } : i)));
        if (selectedInquiry?.id === inq.id) {
          setSelectedInquiry({ ...selectedInquiry, isRead: !inq.isRead });
        }
      }
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (confirm('ইনকোয়ারি বার্তাটি মুছে ফেলতে চান?')) {
      try {
        await fetch(`/api/inquiries?id=${id}&type=${tab}`, { method: 'DELETE' });
        setInquiries(inquiries.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      } catch {}
    }
  };

  const unreadCount = inquiries.filter((i) => !i.isRead).length;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              ইনবক্স ও ইনকোয়ারি / Messages & Inquiries
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              পাঠক যোগাযোগ বার্তা এবং বিজ্ঞাপন অনুরোধ ইনবক্স (অপঠিত: <span className="font-bold text-red-600">{unreadCount}</span>)
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start">
            <button
              onClick={() => { setTab('contact'); setSelectedInquiry(null); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                tab === 'contact'
                  ? 'bg-white dark:bg-darkbg-card text-newspaper-accent dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              পাঠক বার্তা (General)
            </button>
            <button
              onClick={() => { setTab('ad'); setSelectedInquiry(null); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                tab === 'ad'
                  ? 'bg-white dark:bg-darkbg-card text-newspaper-accent dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              বিজ্ঞাপন অনুরোধ (Ads)
            </button>
          </div>
        </div>

        {/* Content List */}
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
        ) : inquiries.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-darkbg-card rounded-xl border border-dashed border-slate-300 dark:border-darkbg-border">
            <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">কোনো নতুন ইনকোয়ারি বার্তা নেই</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List */}
            <div className="lg:col-span-6 space-y-3">
              {inquiries.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedInquiry(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedInquiry?.id === item.id
                      ? 'border-newspaper-accent bg-newspaper-accent/5 dark:bg-newspaper-accent/10 shadow-xs'
                      : item.isRead
                      ? 'bg-white dark:bg-darkbg-card border-slate-200 dark:border-darkbg-border opacity-85'
                      : 'bg-white dark:bg-darkbg-card border-newspaper-accent/40 shadow-xs font-semibold'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-newspaper-accent animate-pulse" />
                      )}
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {tab === 'ad' ? item.companyName : item.name}
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatBanglaDateTime(item.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 line-clamp-1 font-medium">
                    {tab === 'ad' ? `[বাজেট: ${item.budget || 'N/A'}] ${item.placement || 'বিজ্ঞাপন'}` : item.subject}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Details View */}
            <div className="lg:col-span-6">
              {selectedInquiry ? (
                <div className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-darkbg-border p-6 shadow-xs sticky top-20 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-darkbg-border">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleRead(selectedInquiry)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          selectedInquiry.isRead
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {selectedInquiry.isRead ? 'পঠিত' : 'অপঠিত হিসেবে চিহ্নিত'}
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(selectedInquiry.id)}
                      className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 text-xs"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                      {tab === 'ad' ? selectedInquiry.companyName : selectedInquiry.subject}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      তারিখ: {formatBanglaDateTime(selectedInquiry.createdAt)}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <span className="font-bold w-20">প্রেরক:</span>
                      <span>{tab === 'ad' ? selectedInquiry.contactPerson : selectedInquiry.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${selectedInquiry.email}`} className="text-newspaper-accent hover:underline">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    {selectedInquiry.phone && (
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{selectedInquiry.phone}</span>
                      </div>
                    )}
                    {tab === 'ad' && selectedInquiry.budget && (
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <span>বাজেট: {selectedInquiry.budget} ({selectedInquiry.placement})</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">বার্তার মূল বক্তব্য:</h5>
                    <div className="bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-lg border border-slate-100 dark:border-darkbg-border text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(tab === 'ad' ? 'বিজ্ঞাপন অনুরোধ - StatBound' : selectedInquiry.subject)}`}
                      className="inline-flex items-center justify-center gap-2 w-full bg-newspaper-accent text-white py-2 rounded-lg text-xs font-bold hover:bg-newspaper-accent/90 shadow-xs"
                    >
                      <Mail className="w-4 h-4" />
                      <span>ইমেইলে উত্তর দিন</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-darkbg-card rounded-xl border border-dashed border-slate-300 dark:border-darkbg-border p-12 text-center text-xs text-slate-400">
                  বামদিকের তালিকা থেকে যেকোনো বার্তা নির্বাচন করে বিস্তারিত দেখুন।
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
