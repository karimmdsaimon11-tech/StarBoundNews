import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Building, ChevronRight } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';
import AdSlot from '@/components/ads/AdSlot';

export const revalidate = 60;

export default async function DistrictIndexPage() {
  const districts = await prisma.district.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { articles: true },
      },
    },
  }).catch(() => []);

  // Group by division
  const divisions = Array.from(new Set(districts.map((d) => d.divisionBn || d.division)));

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] dark:bg-darkbg text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Header */}
        <div className="pb-6 mb-8 border-b border-slate-200 dark:border-darkbg-border">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>সারাদেশের খবর / DISTRICT NEWS</span>
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
            জেলা সংবাদ ও আঞ্চলিক পরিক্রমা
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            আপনার জেলা বা বিভাগের সর্বশেষ বস্তুনিষ্ঠ সংবাদ ও সরেজমিন প্রতিবেদন বেছে নিন।
          </p>
        </div>

        <AdSlot placement="TOP_BANNER" />

        {/* Division Groups Grid */}
        <div className="space-y-8 my-6">
          {divisions.map((divName) => {
            const divDistricts = districts.filter((d) => (d.divisionBn || d.division) === divName);

            return (
              <div key={divName} className="bg-white dark:bg-darkbg-card p-6 rounded-xl border border-slate-200/80 dark:border-darkbg-border shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <Building className="w-4 h-4 text-teal-600" />
                  <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                    {divName} বিভাগ
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {divDistricts.map((dist) => (
                    <Link
                      key={dist.slug}
                      href={`/district/${dist.slug}`}
                      className="group p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-newspaper-navy hover:text-white dark:hover:bg-teal-600 transition-all text-center flex flex-col justify-between"
                    >
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-white block">
                        {dist.nameBn}
                      </span>
                      <span className="text-[11px] text-slate-400 group-hover:text-slate-200 mt-1">
                        {toBanglaNumber(dist._count.articles)} টি সংবাদ
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
