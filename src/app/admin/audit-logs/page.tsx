'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { History, Shield, RefreshCw } from 'lucide-react';
import { formatBanglaDateTime } from '@/lib/date';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = () => {
    setLoading(true);
    fetch('/api/audit-logs')
      .then((res) => res.json())
      .then((data) => {
        if (data.logs) setLogs(data.logs);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              সিস্টেম অডিট ও লগ / Audit Trail
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              নিউজ পাবলিশিং, বিজ্ঞাপন ও সম্পাদনা সংক্রান্ত সকল ক্রিয়াকলাপের বিবরণ
            </p>
          </div>
          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors self-start"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>লগ রিফ্রেশ</span>
          </button>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-darkbg-border shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
          ) : logs.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-xs">
              <History className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              কোনো সিস্টেম অডিট লগ নেই।
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-darkbg-border font-semibold">
                  <tr>
                    <th className="p-3.5">সময় (BST)</th>
                    <th className="p-3.5">ইউজার / অ্যাক্টর</th>
                    <th className="p-3.5">অ্যাকশন</th>
                    <th className="p-3.5">বিস্তারিত</th>
                    <th className="p-3.5">আইপি অ্যাড্রেস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-darkbg-border">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatBanglaDateTime(log.createdAt)}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {log.userName || log.user?.name || 'System'}
                        </span>
                        {log.user?.role && (
                          <span className="text-[10px] text-newspaper-accent block font-mono">
                            {log.user.role}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded font-mono font-semibold text-[11px]">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400 max-w-sm font-mono text-[11px] truncate">
                        {log.details || '—'}
                      </td>
                      <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                        {log.ipAddress || '127.0.0.1'}
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
