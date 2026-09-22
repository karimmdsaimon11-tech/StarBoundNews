'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={`flex items-center flex-wrap gap-2 text-sm ${className}`}>
      <span className="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400 text-xs">
        <Share2 className="w-3.5 h-3.5" />
        শেয়ার করুন:
      </span>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="p-1.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
        title="ফেসবুকে শেয়ার করুন"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="p-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
        title="হোয়াটসঅ্যাপে পাঠান"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.301-.778.979-.953 1.18-.175.2-.35.226-.651.075-.3-.15-1.267-.467-2.414-1.49-1.026-.914-1.718-2.043-1.919-2.389-.2-.345-.021-.532.129-.681.136-.135.301-.351.452-.527.15-.175.2-.301.3-.502.1-.2.05-.376-.025-.526-.075-.15-.678-1.635-.929-2.241-.244-.59-.492-.51-.678-.52l-.578-.01c-.2 0-.526.075-.802.376-.276.301-1.054 1.03-1.054 2.511 0 1.482 1.079 2.911 1.23 3.112.15.2 2.124 3.243 5.145 4.548 3.02 1.306 3.02.87 3.57.815.552-.055 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.35zM12.04 21.788h-.006a9.78 9.78 0 0 1-4.992-1.371l-.358-.213-3.714.974.991-3.621-.233-.371A9.77 9.77 0 0 1 2.25 12.04c0-5.405 4.398-9.803 9.809-9.803 2.62 0 5.083 1.02 6.937 2.874a9.75 9.75 0 0 1 2.868 6.931c-.001 5.407-4.4 9.746-9.824 9.746z" />
        </svg>
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="p-1.5 rounded-full bg-slate-900/10 dark:bg-slate-100/10 text-slate-800 dark:text-slate-100 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        title="এক্স (টুইটার)-এ শেয়ার করুন"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-1.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
        title="লিঙ্কডইনে শেয়ার করুন"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
        title="লিংক কপি করুন"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span className="text-green-600">কপি হয়েছে!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            <span>কপি লিংক</span>
          </>
        )}
      </button>
    </div>
  );
}
export default ShareButtons;
