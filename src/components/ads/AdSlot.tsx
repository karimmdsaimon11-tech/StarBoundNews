'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export type AdPlacementType =
  | 'TOP_BANNER'
  | 'HEADER'
  | 'HOMEPAGE_HERO'
  | 'IN_FEED'
  | 'ARTICLE_TOP'
  | 'ARTICLE_MIDDLE'
  | 'ARTICLE_BOTTOM'
  | 'SIDEBAR'
  | 'MOBILE_STICKY'
  | 'FOOTER';

interface AdItem {
  id: string;
  name: string;
  advertiser: string;
  imageUrl: string;
  targetUrl: string;
  placement: AdPlacementType;
}

interface AdSlotProps {
  placement: AdPlacementType;
  className?: string;
  initialAd?: AdItem | null;
}

export function AdSlot({ placement, className = '', initialAd }: AdSlotProps) {
  const [ad, setAd] = useState<AdItem | null>(initialAd || null);
  const [loading, setLoading] = useState(!initialAd);

  useEffect(() => {
    if (!initialAd) {
      fetch(`/api/ads?placement=${placement}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.ad) {
            setAd(data.ad);
            // Track impression
            fetch(`/api/ads/${data.ad.id}/track`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ type: 'impression' }),
            }).catch(() => {});
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [placement, initialAd]);

  const handleAdClick = () => {
    if (ad) {
      fetch(`/api/ads/${ad.id}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'click' }),
      }).catch(() => {});
    }
  };

  // Dimensions based on placement
  const isHeader = placement === 'HEADER';
  const isSidebar = placement === 'SIDEBAR';
  const isTopBanner = placement === 'TOP_BANNER';

  return (
    <div className={`ad-slot my-4 flex flex-col items-center justify-center ${className}`}>
      <div className="w-full flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 px-1">
        <span>বিজ্ঞাপন / Advertisement</span>
        {ad && <span className="text-[10px] lowercase text-slate-400">{ad.advertiser}</span>}
      </div>

      {ad ? (
        <a
          href={ad.targetUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleAdClick}
          className="group relative block w-full overflow-hidden rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-all hover:border-newspaper-blue/40 shadow-sm"
        >
          <img
            src={ad.imageUrl}
            alt={ad.name}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-[1.01] ${
              isSidebar
                ? 'max-h-[350px] min-h-[250px]'
                : isHeader
                ? 'max-h-[90px]'
                : isTopBanner
                ? 'max-h-[110px]'
                : 'max-h-[200px]'
            }`}
          />
          <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
            <span>ভিজিট করুন</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </div>
        </a>
      ) : (
        <Link
          href="/advertise"
          className={`flex w-full flex-col items-center justify-center rounded border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 p-4 text-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/60 ${
            isSidebar
              ? 'min-h-[200px]'
              : isHeader
              ? 'min-h-[75px]'
              : 'min-h-[85px]'
          }`}
        >
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            স্ট্যাটবাউন্ড নিউজে বিজ্ঞাপন দিন
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            প্রতিদিন লক্ষাধিক পাঠকের কাছে আপনার ব্র্যান্ড পৌঁছে দিতে যোগাযোগ করুন
          </p>
        </Link>
      )}
    </div>
  );
}
export default AdSlot;
