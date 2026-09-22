'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Users,
  Flame,
  LayoutTemplate,
  Megaphone,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Camera,
  Mail,
  Inbox,
  BarChart3,
  UserCheck,
  Settings,
  History,
  LogOut,
  ExternalLink,
  Shield,
  Key,
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'ড্যাশবোর্ড', labelEn: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'সংবাদ ও প্রবন্ধ', labelEn: 'Articles', href: '/admin/articles', icon: FileText },
    { label: 'ক্যাটাগরি', labelEn: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'সাংবাদিক ও লেখক', labelEn: 'Authors', href: '/admin/authors', icon: Users },
    { label: 'ব্রেকিং নিউজ', labelEn: 'Breaking News', href: '/admin/breaking-news', icon: Flame },
    { label: 'হোমপেজ লেআউট', labelEn: 'Homepage CMS', href: '/admin/homepage', icon: LayoutTemplate },
    { label: 'বিজ্ঞাপন ব্যবস্থাপনা', labelEn: 'Advertisements', href: '/admin/advertisements', icon: Megaphone },
    { label: 'মন্তব্য মডারেশন', labelEn: 'Comments Queue', href: '/admin/comments', icon: MessageSquare },
    { label: 'মিডিয়া লাইব্রেরি', labelEn: 'Media Assets', href: '/admin/media', icon: ImageIcon },
    { label: 'ভিডিও সংবাদ', labelEn: 'Videos', href: '/admin/videos', icon: Video },
    { label: 'ফটো গ্যালারি', labelEn: 'Photo Stories', href: '/admin/photo-galleries', icon: Camera },
    { label: 'নিউজলেটার', labelEn: 'Subscribers', href: '/admin/newsletter', icon: Mail },
    { label: 'ইনবক্স ও ইনকোয়ারি', labelEn: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
    { label: 'অ্যানালিটিক্স', labelEn: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'ইউজার ও রোলস', labelEn: 'Staff Users', href: '/admin/users', icon: UserCheck },
    { label: 'প্রোফাইল ও নিরাপত্তা', labelEn: 'Profile & Security', href: '/admin/profile', icon: Key },
    { label: 'সাইট সেটিংস', labelEn: 'Site Settings', href: '/admin/settings', icon: Settings },
    { label: 'অডিট লগ', labelEn: 'Audit Logs', href: '/admin/audit-logs', icon: History },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800 flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-newspaper-accent text-white flex items-center justify-center font-serif font-black text-lg shadow-sm">
            S
          </div>
          <div>
            <span className="font-serif font-bold text-white text-sm tracking-wide block">
              STATBOUND <span className="text-newspaper-accent font-light">CMS</span>
            </span>
            <span className="text-[10px] text-slate-400 block">নিউজ পাবলিশিং সিস্টেম</span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-newspaper-accent text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              <span className="text-[10px] opacity-60 uppercase font-mono">{item.labelEn}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>পত্রিকা প্রচ্ছদ দেখুন</span>
          </div>
          <span className="text-[10px]">Live Site</span>
        </Link>
      </div>
    </aside>
  );
}
export default AdminSidebar;
