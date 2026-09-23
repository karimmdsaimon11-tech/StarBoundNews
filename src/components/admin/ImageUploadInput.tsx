'use client';

import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, Loader2, RefreshCw } from 'lucide-react';

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helperText?: string;
  aspectRatio?: 'video' | 'square' | 'banner' | 'auto';
  className?: string;
}

export default function ImageUploadInput({
  label = 'ছবি / ইমেজ (Image)',
  value,
  onChange,
  placeholder = 'https://images.unsplash.com/... বা কম্পিউটার থেকে আপলোড করুন',
  helperText,
  aspectRatio = 'video',
  className = '',
}: ImageUploadInputProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'ছবি আপলোড করতে ব্যর্থ হয়েছে');
      }

      onChange(data.url);
    } catch (err: any) {
      setUploadError(err.message || 'আপলোড ব্যর্থ হয়েছে');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'banner'
      ? 'aspect-[21/9]'
      : 'min-h-[160px]';

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
            {label}
          </label>
        )}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2 py-1 rounded-md transition-colors flex items-center gap-1 ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-slate-700 text-newspaper-navy dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>আপলোড</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2 py-1 rounded-md transition-colors flex items-center gap-1 ${
              activeTab === 'url'
                ? 'bg-white dark:bg-slate-700 text-newspaper-navy dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>ইমেজ URL</span>
          </button>
        </div>
      </div>

      {/* Image Preview Box */}
      {value ? (
        <div className={`relative ${aspectClass} rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 group shadow-xs`}>
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-900 text-xs font-bold flex items-center gap-1 shadow-md transition-transform active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ছবি পরিবর্তন করুন</span>
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white shadow-md transition-transform active:scale-95"
              title="মুছে ফেলুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded truncate max-w-[80%]">
            {value}
          </span>
        </div>
      ) : activeTab === 'upload' ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-newspaper-blue dark:hover:border-blue-400 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 group ${aspectClass}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-newspaper-accent animate-spin" />
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">আপলোড হচ্ছে...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-newspaper-navy dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  কম্পিউটার বা ডিভাইস থেকে ছবি নির্বাচন করুন
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  JPG, PNG, WebP, GIF (সর্বোচ্চ ১৫MB)
                </p>
              </div>
            </>
          )}
        </div>
      ) : null}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
        className="hidden"
      />

      {/* URL Input Tab or Direct Editor */}
      {activeTab === 'url' && (
        <div className="relative">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full text-xs font-mono px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-newspaper-blue"
          />
        </div>
      )}

      {uploadError && (
        <p className="text-xs text-red-600 dark:text-red-400 font-semibold">{uploadError}</p>
      )}

      {helperText && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
}
