'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CloudSun, Clock, PhoneCall, Mail, MapPin } from 'lucide-react';
import { formatBanglaFullDate, formatBanglaTime } from '@/lib/date';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/lib/constants';
import ThemeToggle from '../common/ThemeToggle';

export function TopBar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Date & Time in BST */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-200 font-medium">
            <Clock className="w-3.5 h-3.5 text-newspaper-accent" />
            <span>{formatBanglaFullDate(currentDate)}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{formatBanglaTime(currentDate)} (বিএসটি)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded text-[11px]">
            <CloudSun className="w-3.5 h-3.5 text-amber-400" />
            <span>ঢাকা ২৮° সে. / চট্টগ্রাম ২৯° সে.</span>
          </div>
        </div>

        {/* Right: Quick Links, Social Icons & Dark Mode */}
        <div className="flex items-center gap-3">
          <Link
            href="/today"
            className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            আজকের খবর
          </Link>
          <span className="text-slate-700">|</span>
          <Link
            href="/archive"
            className="hover:text-white transition-colors"
          >
            আর্কাইভ
          </Link>
          <span className="text-slate-700">|</span>
          <Link
            href="/advertise"
            className="hover:text-white transition-colors"
          >
            বিজ্ঞাপন
          </Link>
          <span className="text-slate-700">|</span>
          <Link
            href="/contact"
            className="hover:text-white transition-colors"
          >
            যোগাযোগ
          </Link>

          <span className="text-slate-700">|</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
export default TopBar;
