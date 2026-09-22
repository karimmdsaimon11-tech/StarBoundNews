'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, LogOut, User, Shield, Bell, Plus } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border px-4 sm:px-6 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            নিউজ ডেটাবেজ সক্রিয় (Live DB Connected)
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick New Article Button */}
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-newspaper-accent hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>নতুন সংবাদ লিখুন</span>
        </Link>

        {/* User Role Badge */}
        {currentUser ? (
          <Link
            href="/admin/profile"
            title="প্রোফাইল ও পাসওয়ার্ড পরিবর্তন"
            className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-newspaper-navy text-white flex items-center justify-center font-bold text-xs ring-2 ring-transparent hover:ring-newspaper-accent transition-all">
              {currentUser.name?.[0] || 'A'}
            </div>
            <div className="hidden md:block text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-newspaper-accent font-semibold uppercase block">
                {currentUser.role}
              </span>
            </div>
          </Link>
        ) : null}

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="লগআউট"
          className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
export default AdminHeader;
