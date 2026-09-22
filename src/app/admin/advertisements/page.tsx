'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Megaphone, Plus, Trash2, Power, BarChart3, Eye, MousePointerClick, ExternalLink } from 'lucide-react';
import { AD_PLACEMENTS } from '@/lib/constants';
import { toBanglaNumber } from '@/lib/date';

export default function AdminAdvertisementsPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    advertiser: '',
    imageUrl: '',
    targetUrl: '',
    placement: 'TOP_BANNER',
    deviceTargeting: 'ALL',
    priority: '1',
  });

  const fetchAds = () => {
    fetch('/api/ads?all=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.ads) setAds(data.ads);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowAddModal(false);
        setFormData({
          name: '',
          advertiser: '',
          imageUrl: '',
          targetUrl: '',
          placement: 'TOP_BANNER',
          deviceTargeting: 'ALL',
          priority: '1',
        });
        fetchAds();
      }
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (confirm('বিজ্ঞাপনটি মুছে ফেলতে চান?')) {
      try {
        await fetch(`/api/ads?id=${id}`, { method: 'DELETE' });
        setAds(ads.filter((a) => a.id !== id));
      } catch {}
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="pb-4 border-b border-slate-200 dark:border-darkbg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              বিজ্ঞাপন ও মনিটাইজেশন ব্যবস্থাপনা / Ads CMS
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              বিজ্ঞাপন প্লেসমেন্ট নিয়ন্ত্রণ, ক্রিয়েটিভ আপলোড ও রিয়েল-টাইম ইমপ্রেশন/ক্লিক পরিসংখ্যান।
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-newspaper-accent hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন বিজ্ঞাপন যুক্ত করুন</span>
          </button>
        </div>

        {/* Modal for adding ad */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-darkbg-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full">
              <h2 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-4">
                নতুন বিজ্ঞাপন ক্যাম্পেইন তৈরি
              </h2>

              <form onSubmit={handleCreate} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">বিজ্ঞাপনের নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="উদাঃ বাংলা টেলিকম ৫জি ব্যানার"
                    className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">বিজ্ঞাপনদাতা (Advertiser) *</label>
                  <input
                    type="text"
                    required
                    value={formData.advertiser}
                    onChange={(e) => setFormData({ ...formData, advertiser: e.target.value })}
                    placeholder="উদাঃ বাংলা টেলিকম লিঃ"
                    className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">ইমেজ ব্যানার URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">টার্গেট লিংক (Click URL) *</label>
                  <input
                    type="text"
                    required
                    value={formData.targetUrl}
                    onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                    placeholder="https://advertiser.com/offer"
                    className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">প্লেসমেন্ট (Placement)</label>
                    <select
                      value={formData.placement}
                      onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {Object.entries(AD_PLACEMENTS).map(([key, val]) => (
                        <option key={key} value={key}>
                          {val.labelBn} ({key})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">ডিভাইস টার্গেটিং</label>
                    <select
                      value={formData.deviceTargeting}
                      onChange={(e) => setFormData({ ...formData, deviceTargeting: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="ALL">সকল ডিভাইস (ALL)</option>
                      <option value="DESKTOP">ডেস্কটপ মাত্র (DESKTOP)</option>
                      <option value="MOBILE">মোবাইল মাত্র (MOBILE)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-100"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-newspaper-accent text-white font-semibold hover:bg-red-700"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ads Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ads.map((ad) => {
            const ctr = ad.impressionsCount > 0 ? ((ad.clicksCount / ad.impressionsCount) * 100).toFixed(2) : '0.00';

            return (
              <div
                key={ad.id}
                className="bg-white dark:bg-darkbg-card rounded-xl border border-slate-200/80 dark:border-darkbg-border p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-newspaper-navy/10 dark:bg-blue-900/30 text-newspaper-navy dark:text-blue-400">
                      {ad.placement}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ad.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {ad.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </span>
                  </div>

                  <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white mb-1">
                    {ad.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">বিজ্ঞাপনদাতা: {ad.advertiser}</p>

                  <div className="aspect-[16/6] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 border border-slate-200 dark:border-slate-700">
                    <img src={ad.imageUrl} alt={ad.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Metrics Bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                      <Eye className="w-3.5 h-3.5" />
                      {toBanglaNumber(ad.impressionsCount)} ভিউ
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-600">
                      <MousePointerClick className="w-3.5 h-3.5" />
                      {toBanglaNumber(ad.clicksCount)} ক্লিক
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">({ctr}% CTR)</span>
                  </div>

                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="p-1.5 rounded text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
