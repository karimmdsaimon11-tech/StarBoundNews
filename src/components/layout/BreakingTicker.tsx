'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flame, ChevronRight, Volume2 } from 'lucide-react';

interface BreakingItem {
  id: string;
  headline: string;
  headlineBn?: string | null;
  url?: string | null;
}

interface BreakingTickerProps {
  initialItems?: BreakingItem[];
}

export function BreakingTicker({ initialItems }: BreakingTickerProps) {
  const [items, setItems] = useState<BreakingItem[]>(initialItems || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!initialItems || initialItems.length === 0) {
      fetch('/api/breaking-news')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.items) {
            setItems(data.items);
          }
        })
        .catch(() => {});
    }
  }, [initialItems]);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items, isPaused]);

  if (items.length === 0) return null;

  const currentStory = items[currentIndex] || items[0];

  return (
    <div
      className="bg-red-50 dark:bg-red-950/40 border-y border-red-200 dark:border-red-900/60 py-1.5 px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-newspaper-accent text-white font-bold text-xs px-2.5 py-1 rounded shadow-sm">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          <span>ব্রেকিং নিউজ</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative h-6 flex items-center">
          <div className="w-full truncate text-sm font-medium text-slate-900 dark:text-slate-100">
            {currentStory.url ? (
              <Link
                href={currentStory.url}
                className="hover:text-newspaper-accent transition-colors flex items-center gap-1"
              >
                <span>{currentStory.headlineBn || currentStory.headline}</span>
                <ChevronRight className="w-3.5 h-3.5 text-newspaper-accent flex-shrink-0 inline" />
              </Link>
            ) : (
              <span>{currentStory.headlineBn || currentStory.headline}</span>
            )}
          </div>
        </div>

        {/* Controls / Counter */}
        {items.length > 1 && (
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 flex-shrink-0">
            <span>{currentIndex + 1}</span>
            <span>/</span>
            <span>{items.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default BreakingTicker;
