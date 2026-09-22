import React from 'react';
import Link from 'next/link';
import { Play, Eye } from 'lucide-react';
import { toBanglaNumber } from '@/lib/date';

export interface VideoStoryData {
  id: string;
  title: string;
  titleBn?: string | null;
  slug: string;
  description?: string | null;
  thumbnailUrl: string;
  duration: string;
  viewsCount?: number;
}

interface VideoNewsCardProps {
  video: VideoStoryData;
}

export function VideoNewsCard({ video }: VideoNewsCardProps) {
  const displayTitle = video.titleBn || video.title;

  return (
    <article className="group flex flex-col bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800 shadow-md hover:border-red-500/50 transition-all">
      {/* Thumbnail with Play Overlay */}
      <Link href={`/video/${video.slug}`} className="relative aspect-[16/9] overflow-hidden block bg-black">
        <img
          src={video.thumbnailUrl}
          alt={displayTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:bg-red-600">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
        {/* Duration Badge */}
        <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
          {video.duration}
        </span>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="font-headline font-bold text-sm sm:text-base text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug mb-2">
          <Link href={`/video/${video.slug}`}>
            {displayTitle}
          </Link>
        </h3>

        {video.viewsCount !== undefined && video.viewsCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Eye className="w-3.5 h-3.5" />
            <span>{toBanglaNumber(video.viewsCount)} বার দেখা হয়েছে</span>
          </div>
        )}
      </div>
    </article>
  );
}
export default VideoNewsCard;
