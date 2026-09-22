'use client';

import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DailySyncButton({ className = '' }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleSync = async () => {
    setLoading(true);
    setStatus('idle');
    setMsg('');

    try {
      const res = await fetch('/api/cron/daily-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ force: true }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setMsg(data.message || 'আজকের খবর ও ছবি সফলভাবে সিঙ্ক ও তাজা করা হয়েছে!');
        router.refresh();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setMsg(data.error || 'সিঙ্ক ব্যর্থ হয়েছে');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setMsg('সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি');
      setTimeout(() => setStatus('idle'), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={handleSync}
        disabled={loading}
        title="আজকের তারিখের সাথে খবরের টাইমস্ট্যাম্প ও প্রাসঙ্গিক বাস্তব ছবি অটো-সিঙ্ক করুন"
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'সিঙ্ক হচ্ছে...' : 'আজকের খবর অটো-সিঙ্ক ও তাজা করুন'}</span>
      </button>

      {status === 'success' && (
        <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{msg}</span>
        </span>
      )}

      {status === 'error' && (
        <span className="flex items-center gap-1 text-[11px] text-red-600 dark:text-red-400 font-bold animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{msg}</span>
        </span>
      )}
    </div>
  );
}
