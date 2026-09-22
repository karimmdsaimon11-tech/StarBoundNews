import React from 'react';
import { LucideIcon } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';

interface StatsCardProps {
  title: string;
  titleEn: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
}

export function StatsCard({
  title,
  titleEn,
  value,
  subtitle,
  icon: Icon,
  color = 'text-newspaper-navy dark:text-blue-400 bg-newspaper-navy/10',
}: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-darkbg-card p-5 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs flex items-center justify-between">
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          <span>{title}</span>
          <span className="text-[10px] opacity-60">({titleEn})</span>
        </div>
        <div className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {typeof value === 'number' ? toBanglaNumber(value) : value}
        </div>
        {subtitle && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
export default StatsCard;
