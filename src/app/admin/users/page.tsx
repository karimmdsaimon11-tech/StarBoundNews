'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { UserCheck, Plus, Trash2, Edit2, Shield, Mail, User } from 'lucide-react';
import Image from 'next/image';
import { formatBanglaDate } from '@/lib/date';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('REPORTER');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchUsers = () => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setRole('REPORTER');
    setBio('');
    setPassword('');
    setErrorMsg('');
    setShowModal(true);
  };

  const openEdit = (u: any) => {
    setEditingId(u.id);
    setName(u.name);
    setEmail(u.email);
    setRole(u.role);
    setBio(u.bio || '');
    setPassword('');
    setErrorMsg('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (password && password.length < 6) {
      setErrorMsg('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }

    setSaving(true);
    setErrorMsg('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body: any = {
        id: editingId,
        name,
        email,
        role,
        bio,
      };
      if (password) {
        body.password = password;
      }

      const res = await fetch('/api/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'সংরক্ষণ ব্যর্থ হয়েছে');
      } else {
        setShowModal(false);
        fetchUsers();
      }
    } catch {
      setErrorMsg('সার্ভার এরর, পুনরায় চেষ্টা করুন।');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('স্টাফ অ্যাকাউন্টটি মুছে ফেলতে চান?')) {
      try {
        await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
        setUsers(users.filter((u) => u.id !== id));
      } catch {}
    }
  };

  const getRoleBadge = (roleStr: string) => {
    switch (roleStr) {
      case 'SUPER_ADMIN':
        return <span className="bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400 font-bold px-2 py-0.5 rounded text-[10px]">Super Admin</span>;
      case 'EDITOR':
        return <span className="bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400 font-bold px-2 py-0.5 rounded text-[10px]">Editor</span>;
      case 'REPORTER':
        return <span className="bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 font-bold px-2 py-0.5 rounded text-[10px]">Reporter</span>;
      case 'AD_MANAGER':
        return <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px]">Ad Manager</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 font-bold px-2 py-0.5 rounded text-[10px]">{roleStr}</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-darkbg-border">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              ইউজার ও অ্যাক্সেস কন্ট্রোল / Staff Users & RBAC
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              সাংবাদিক, সম্পাদক ও বিজ্ঞাপন প্রশাসকদের ভূমিকা ও এক্সেস নিয়ন্ত্রণ
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-newspaper-accent text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-newspaper-accent/90 transition-colors shadow-xs self-start"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন স্টাফ ইউজার</span>
          </button>
        </div>

        {/* User List */}
        <div className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200 dark:border-darkbg-border shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-xs text-slate-500">লোড হচ্ছে...</div>
          ) : users.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-xs">কোনো ইউজার পাওয়া যায়নি</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-darkbg-border font-semibold">
                  <tr>
                    <th className="p-3.5">স্টাফ সদস্য</th>
                    <th className="p-3.5">ইমেইল</th>
                    <th className="p-3.5">রোল (ভূমিকা)</th>
                    <th className="p-3.5">সংযুক্ত লেখক প্রোফাইল</th>
                    <th className="p-3.5">যোগদানের তারিখ</th>
                    <th className="p-3.5 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-darkbg-border">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative flex-shrink-0">
                            {u.avatar ? (
                              <Image src={u.avatar} alt={u.name} fill className="object-cover" />
                            ) : (
                              <User className="w-4 h-4 m-2 text-slate-500" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{u.name}</span>
                            {u.bio && <span className="text-[10px] text-slate-400 block truncate max-w-xs">{u.bio}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">
                        {u.email}
                      </td>
                      <td className="p-3.5">
                        {getRoleBadge(u.role)}
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400">
                        {u.author ? (
                          <span className="text-newspaper-accent font-medium">{u.author.nameBn || u.author.name}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-500 dark:text-slate-400 font-mono">
                        {formatBanglaDate(u.createdAt)}
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => openEdit(u)}
                          className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-newspaper-accent"
                          title="সম্পাদনা"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="p-1.5 text-red-600 hover:text-red-700"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-darkbg-card rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-darkbg-border shadow-2xl">
              <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-4">
                {editingId ? 'স্টাফ অ্যাকাউন্ট সম্পাদনা' : 'নতুন স্টাফ ইউজার তৈরি'}
              </h3>
              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    স্টাফের পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="নাসির উদ্দীন"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ইমেইল ঠিকানা (Login Email) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="reporter@statbound.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {editingId ? 'নতুন পাসওয়ার্ড রিসেট (ঐচ্ছিক)' : 'লগইন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={editingId ? 'অপরিবর্তিত রাখতে খালি রাখুন' : 'নতুন পাসওয়ার্ড লিখুন'}
                    required={!editingId}
                    minLength={6}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                  {editingId && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                      পাসওয়ার্ড পরিবর্তন করতে না চাইলে খালি রাখুন।
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ভূমিকা / রোল (Role) *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN (পূর্ণ নিয়ন্ত্রণ)</option>
                    <option value="EDITOR">EDITOR (সম্পাদক ও প্রকাশনা)</option>
                    <option value="REPORTER">REPORTER (সংবাদ লেখক/প্রতিবেদক)</option>
                    <option value="AD_MANAGER">AD_MANAGER (বিজ্ঞাপন ব্যবস্থাপক)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    সংক্ষিপ্ত বিবরণ বা পদবী
                  </label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="সিনিয়র ক্রাইম রিপোর্টার"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-darkbg-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-newspaper-accent"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-darkbg-border">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 text-xs font-bold bg-newspaper-accent text-white rounded-lg hover:bg-newspaper-accent/90 disabled:opacity-50"
                  >
                    {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
