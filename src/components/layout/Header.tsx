'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, Newspaper, Flame, Bell, User } from 'lucide-react';
import { SITE_NAME, SITE_TAGLINE, MAIN_CATEGORIES } from '@/lib/constants';
import TopBar from './TopBar';
import BreakingTicker from './BreakingTicker';
import ThemeToggle from '../common/ThemeToggle';

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="w-full bg-white dark:bg-darkbg border-b border-slate-200 dark:border-darkbg-border sticky top-0 z-40 shadow-xs">
      {/* Top Utility Bar */}
      <TopBar />

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo & Tagline */}
        <div className="flex-1 lg:flex-initial text-center lg:text-left">
          <Link href="/" className="inline-block group">
            <div className="flex items-center justify-center lg:justify-start gap-1.5">
              <span className="font-serif font-black tracking-tight text-2xl sm:text-3xl md:text-4xl text-newspaper-navy dark:text-white uppercase transition-colors group-hover:text-newspaper-blue">
                STATBOUND
              </span>
              <span className="font-serif font-light text-2xl sm:text-3xl md:text-4xl text-newspaper-accent">
                NEWS
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-0.5">
              {SITE_TAGLINE}
            </p>
          </Link>
        </div>

        {/* Desktop Search & Admin Quick Action */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Quick Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-64 xl:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সংবাদ অনুসন্ধান করুন..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>
        </div>

        {/* Mobile Search & Theme Action */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {searchOpen && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-slate-100 dark:border-slate-800">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সংবাদ অনুসন্ধান করুন..."
              autoFocus
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      )}

      {/* Desktop Main Category Navigation */}
      <nav className="hidden lg:block border-t border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg-card">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center flex-wrap gap-1 xl:gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 py-1.5">
            <li>
              <Link
                href="/"
                className="px-2.5 py-1 rounded hover:text-newspaper-accent dark:hover:text-newspaper-accent transition-colors flex items-center gap-1"
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>প্রচ্ছদ</span>
              </Link>
            </li>
            {MAIN_CATEGORIES.filter((c) => c.isMain).map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="px-2.5 py-1 rounded hover:text-newspaper-accent dark:hover:text-newspaper-accent transition-colors"
                >
                  {cat.nameBn}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Breaking News Ticker Bar */}
      <BreakingTicker />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-darkbg h-full overflow-y-auto p-5 shadow-2xl z-10 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="font-serif font-black text-xl text-newspaper-navy dark:text-white uppercase">
                STATBOUND <span className="text-newspaper-accent font-light">NEWS</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="py-4 space-y-1 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                ক্যাটাগরি সমূহ
              </p>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                প্রচ্ছদ (Home)
              </Link>
              {MAIN_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {cat.nameBn} ({cat.name})
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
