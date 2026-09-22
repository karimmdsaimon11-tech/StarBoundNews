'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, KeyRound, ArrowRight, UserCheck, AlertCircle, Newspaper } from 'lucide-react';
import { DEMO_ACCOUNTS } from '@/lib/auth';
import { SITE_NAME } from '@/lib/constants';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent, demoRole?: string) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, demoRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'লগইন ব্যর্থ হয়েছে।');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'একটি ত্রুটি ঘটেছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group mb-3">
            <div className="flex items-center justify-center gap-1.5">
              <span className="font-serif font-black tracking-tight text-3xl text-white uppercase">
                STATBOUND
              </span>
              <span className="font-serif font-light text-3xl text-newspaper-accent">
                NEWS
              </span>
            </div>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>নিউজ পাবলিশিং ও অ্যাডমিন পোর্টাল</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl backdrop-blur-xs text-white">
          <h2 className="font-headline font-bold text-xl mb-1 text-white">
            অ্যাডমিন সিস্টেমে প্রবেশ করুন
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            আপনার প্রাতিষ্ঠানিক ইমেইল ও পাসওয়ার্ড প্রদান করুন।
          </p>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-lg mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ইমেইল ঠিকানা *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@statbound.com"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-600 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-newspaper-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                পাসওয়ার্ড *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-600 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-newspaper-accent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-newspaper-accent hover:bg-red-700 text-white font-semibold text-xs tracking-wide transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'যাচাই হচ্ছে...' : 'লগইন করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Demo Logins for Development */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5" />
                ডেভেলপমেন্ট ডেমো কুইক লগইন
              </span>
              <span className="text-[10px] text-slate-400">১-ক্লিক সুইচ</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => handleLogin(undefined, account.role)}
                  className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-700/80 border border-slate-700 hover:border-newspaper-accent text-left transition-all group"
                >
                  <span className="font-bold text-xs text-white group-hover:text-amber-300 block">
                    {account.labelBn}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {account.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← মূল ওয়েবসাইটে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
