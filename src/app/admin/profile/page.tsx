'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  UserCheck,
  Mail,
  Key,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
  Shield,
  Eye,
  EyeOff,
  User,
  Camera,
  Calendar,
} from 'lucide-react';
import Image from 'next/image';
import { formatBanglaDate } from '@/lib/date';

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState<'info' | 'email' | 'password'>('info');

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Info Tab Form
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');

  // Email Tab Form
  const [newEmail, setNewEmail] = useState('');

  // Password Tab Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const fetchProfile = () => {
    setLoading(true);
    fetch('/api/auth/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
          setName(data.user.name || '');
          setBio(data.user.bio || '');
          setAvatar(data.user.avatar || '');
          setNewEmail(data.user.email || '');
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('নাম খালি রাখা যাবে না।');
      return;
    }

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio, avatar }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে।');
      } else {
        setSuccessMsg('প্রোফাইল তথ্য সফলভাবে সংরক্ষণ করা হয়েছে!');
        setCurrentUser(data.user);
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch {
      setErrorMsg('সার্ভারে যোগাযোগ করতে সমস্যা হচ্ছে।');
    } finally {
      setSaving(false);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newEmail.includes('@')) {
      setErrorMsg('সঠিক ইমেইল ঠিকানা প্রদান করুন।');
      return;
    }

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'ইমেইল পরিবর্তন করতে ব্যর্থ হয়েছে।');
      } else {
        setSuccessMsg('ইমেইল সফলভাবে পরিবর্তন করা হয়েছে! পরবর্তী লগইনে এই নতুন ইমেইল ব্যবহার করুন।');
        setCurrentUser(data.user);
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch {
      setErrorMsg('সার্ভারে যোগাযোগ করতে সমস্যা হচ্ছে।');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না।');
      return;
    }

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে।');
      } else {
        setSuccessMsg('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে! নতুন পাসওয়ার্ড সংরক্ষণ করা হলো।');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch {
      setErrorMsg('সার্ভারে যোগাযোগ করতে সমস্যা হচ্ছে।');
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadge = (roleStr: string) => {
    switch (roleStr) {
      case 'SUPER_ADMIN':
        return <span className="bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400 font-bold px-2.5 py-0.5 rounded-full text-xs">Super Admin (পূর্ণ নিয়ন্ত্রণ)</span>;
      case 'EDITOR':
        return <span className="bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400 font-bold px-2.5 py-0.5 rounded-full text-xs">Editor (সম্পাদক)</span>;
      case 'REPORTER':
        return <span className="bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 font-bold px-2.5 py-0.5 rounded-full text-xs">Reporter (রিপোর্টার)</span>;
      case 'AD_MANAGER':
        return <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded-full text-xs">Ad Manager (বিজ্ঞাপন ব্যবস্থাপক)</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 font-bold px-2.5 py-0.5 rounded-full text-xs">{roleStr}</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-newspaper-accent mb-1">
              <Shield className="w-4 h-4" />
              <span>স্টাফ অ্যাকাউন্ট ও সিকিউরিটি</span>
            </div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              প্রোফাইল, ইমেইল ও পাসওয়ার্ড পরিবর্তন / Profile & Security
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              আপনার অ্যাডমিন অ্যাকাউন্টের নাম, ছবি, ইমেইল ঠিকানা ও পাসওয়ার্ড আপডেট করুন।
            </p>
          </div>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 p-4 rounded-xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-100 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 p-4 rounded-xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Col: User Card (4 cols) */}
            <div className="md:col-span-4 space-y-4">
              <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-6 shadow-xs text-center space-y-3">
                <div className="relative w-20 h-20 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-inner border-2 border-newspaper-accent">
                  {currentUser?.avatar ? (
                    <Image
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 m-5 text-slate-400" />
                  )}
                </div>

                <div>
                  <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                    {currentUser?.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5 truncate">
                    {currentUser?.email}
                  </p>
                </div>

                <div className="pt-2">
                  {getRoleBadge(currentUser?.role)}
                </div>

                {currentUser?.bio && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg text-left leading-relaxed">
                    {currentUser.bio}
                  </p>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-darkbg-border text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>যোগদান: {formatBanglaDate(currentUser?.createdAt)}</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-2 shadow-xs space-y-1">
                <button
                  type="button"
                  onClick={() => { setActiveTab('info'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === 'info'
                      ? 'bg-newspaper-accent text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>ব্যক্তিগত তথ্য ও ছবি</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('email'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === 'email'
                      ? 'bg-newspaper-accent text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>ইমেইল ঠিকানা পরিবর্তন</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('password'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === 'password'
                      ? 'bg-newspaper-accent text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  <span>পাসওয়ার্ড পরিবর্তন</span>
                </button>
              </div>
            </div>

            {/* Right Col: Forms (8 cols) */}
            <div className="md:col-span-8">
              {/* Tab 1: Info */}
              {activeTab === 'info' && (
                <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-6 shadow-xs space-y-5 animate-in fade-in">
                  <div className="pb-3 border-b border-slate-100 dark:border-darkbg-border">
                    <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-newspaper-accent" />
                      ব্যক্তিগত তথ্য ও ছবি সম্পাদনা
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      আপনার নাম, পরিচিতি বা পদবী এবং প্রোফাইল অ্যাভাটার ছবি পরিবর্তন করুন।
                    </p>
                  </div>

                  <form onSubmit={handleUpdateInfo} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        পূর্ণ নাম *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        প্রোফাইল ছবি URL (Avatar Image Link)
                      </label>
                      <input
                        type="url"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-newspaper-accent font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        সংক্ষিপ্ত পরিচিতি বা পদবী (Bio)
                      </label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="সিনিয়র ক্রাইম রিপোর্টার ও কলামিস্ট..."
                        className="w-full p-3 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-newspaper-accent text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'তথ্য সংরক্ষণ করুন'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Tab 2: Change Email */}
              {activeTab === 'email' && (
                <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-6 shadow-xs space-y-5 animate-in fade-in">
                  <div className="pb-3 border-b border-slate-100 dark:border-darkbg-border">
                    <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-newspaper-accent" />
                      ইমেইল ঠিকানা পরিবর্তন (Change Email)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      লগইন ও নোটিফিকেশনের জন্য আপনার নতুন ইমেইল ঠিকানা সেট করুন।
                    </p>
                  </div>

                  <form onSubmit={handleChangeEmail} className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-darkbg-border text-xs">
                      <span className="text-slate-500 block mb-1">বর্তমান ইমেইল:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {currentUser?.email}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        নতুন ইমেইল ঠিকানা *
                      </label>
                      <input
                        type="email"
                        required
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="newemail@statbound.com"
                        className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-newspaper-accent font-mono"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={saving || newEmail === currentUser?.email}
                        className="flex items-center gap-2 bg-newspaper-accent text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'ইমেইল পরিবর্তন করুন'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Tab 3: Change Password */}
              {activeTab === 'password' && (
                <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-6 shadow-xs space-y-5 animate-in fade-in">
                  <div className="pb-3 border-b border-slate-100 dark:border-darkbg-border">
                    <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <Key className="w-4 h-4 text-newspaper-accent" />
                      পাসওয়ার্ড পরিবর্তন (Change Password)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      আপনার অ্যাকাউন্টের সুরক্ষায় শক্তিশালী ও নিরাপদ নতুন পাসওয়ার্ড সেট করুন।
                    </p>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        নতুন পাসওয়ার্ড *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="কমপক্ষে ৬ অক্ষরের নতুন পাসওয়ার্ড..."
                          className="w-full pl-3 pr-10 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password) *
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="পাসওয়ার্ড পুনরায় লিখুন..."
                        className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                      />
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-darkbg-border text-[11px] text-slate-500 space-y-1">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">পাসওয়ার্ড নিরাপত্তা নির্দেশনা:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        <li>কমপক্ষে ৬ অক্ষরের হতে হবে (৮+ অক্ষর প্রস্তাবিত)।</li>
                        <li>অক্ষর, সংখ্যা এবং বিশেষ চিহ্নের মিশ্রণ ব্যবহার করুন।</li>
                      </ul>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={saving || !newPassword}
                        className="flex items-center gap-2 bg-newspaper-accent text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs disabled:opacity-50"
                      >
                        <Lock className="w-4 h-4" />
                        <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'পাসওয়ার্ড আপডেট করুন'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
