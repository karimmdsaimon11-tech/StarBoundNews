import React from 'react';
import Link from 'next/link';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';

export interface PhotoGalleryData {
  id: string;
  title: string;
  titleBn?: string | null;
  slug: string;
  coverImage: string;
  photographerCredit?: string | null;
  images?: { id: string }[];
}

interface PhotoGalleryCardProps {
  gallery: PhotoGalleryData;
}

export function PhotoGalleryCard({ gallery }: PhotoGalleryCardProps) {
  const displayTitle = gallery.titleBn || gallery.title;
  const count = gallery.images?.length || 3;

  return (
    <article className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
      <Link href={`/photo-gallery/${gallery.slug}`} className="block aspect-[16/10] overflow-hidden">
        <img
          src={gallery.coverImage}
          alt={displayTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Camera Photo Count Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>{toBanglaNumber(count)} ছবি</span>
        </div>

        {/* Title & Caption */}
        <div className="absolute bottom-0 inset-x-0 p-4">
          <h3 className="font-headline font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-1">
            {displayTitle}
          </h3>
          {gallery.photographerCredit && (
            <p className="text-[11px] text-slate-300">
              ছবি: {gallery.photographerCredit}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
export default PhotoGalleryCard;
