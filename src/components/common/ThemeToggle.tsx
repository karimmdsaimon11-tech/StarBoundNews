'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('statbound_theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('statbound_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('statbound_theme', 'dark');
      setIsDark(true);
    }
  };

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800" />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={isDark ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
      className="p-1.5 rounded-full transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
    >
      {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
    </button>
  );
}
export default ThemeToggle;
