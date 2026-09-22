export const SITE_NAME = 'STATBOUND NEWS';
export const SITE_TAGLINE = 'প্রতিদিনের খবর, নির্ভরযোগ্য তথ্য';
export const SITE_TAGLINE_EN = 'Daily News, Trusted Information';
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface NavCategory {
  name: string;
  nameBn: string;
  slug: string;
  isMain: boolean;
  icon?: string;
}

export const MAIN_CATEGORIES: NavCategory[] = [
  { name: 'Latest', nameBn: 'সর্বশেষ', slug: 'latest-news', isMain: true },
  { name: 'National', nameBn: 'জাতীয়', slug: 'national', isMain: true },
  { name: 'Politics', nameBn: 'রাজনীতি', slug: 'politics', isMain: true },
  { name: 'International', nameBn: 'আন্তর্জাতিক', slug: 'international', isMain: true },
  { name: 'Education', nameBn: 'শিক্ষা', slug: 'education', isMain: true },
  { name: 'Campus', nameBn: 'ক্যাম্পাস', slug: 'campus', isMain: true },
  { name: 'Business', nameBn: 'ব্যবসা', slug: 'business', isMain: true },
  { name: 'Technology', nameBn: 'প্রযুক্তি', slug: 'technology', isMain: true },
  { name: 'Sports', nameBn: 'খেলাধুলা', slug: 'sports', isMain: true },
  { name: 'Entertainment', nameBn: 'বিনোদন', slug: 'entertainment', isMain: true },
  { name: 'Lifestyle', nameBn: 'জীবনযাপন', slug: 'lifestyle', isMain: true },
  { name: 'Opinion', nameBn: 'মতামত', slug: 'opinion', isMain: true },
  { name: 'Chattogram', nameBn: 'চট্টগ্রাম', slug: 'chattogram', isMain: true },
  { name: 'District', nameBn: 'জেলা', slug: 'district', isMain: true },
  { name: 'Jobs', nameBn: 'চাকরি', slug: 'jobs', isMain: false },
  { name: 'Science', nameBn: 'বিজ্ঞান', slug: 'science', isMain: false },
  { name: 'Health', nameBn: 'স্বাস্থ্য', slug: 'health', isMain: false },
  { name: 'Video', nameBn: 'ভিডিও', slug: 'video', isMain: false },
  { name: 'Photo Gallery', nameBn: 'ছবি', slug: 'photo-gallery', isMain: false },
];

export const DISTRICTS_LIST = [
  { name: 'Chattogram', nameBn: 'চট্টগ্রাম', slug: 'chattogram', division: 'Chattogram', divisionBn: 'চট্টগ্রাম' },
  { name: 'Dhaka', nameBn: 'ঢাকা', slug: 'dhaka', division: 'Dhaka', divisionBn: 'ঢাকা' },
  { name: 'Cumilla', nameBn: 'কুমিল্লা', slug: 'cumilla', division: 'Chattogram', divisionBn: 'চট্টগ্রাম' },
  { name: 'Cox\'s Bazar', nameBn: 'কক্সবাজার', slug: 'coxs-bazar', division: 'Chattogram', divisionBn: 'চট্টগ্রাম' },
  { name: 'Feni', nameBn: 'ফেনী', slug: 'feni', division: 'Chattogram', divisionBn: 'চট্টগ্রাম' },
  { name: 'Noakhali', nameBn: 'নোয়াখালী', slug: 'noakhali', division: 'Chattogram', divisionBn: 'চট্টগ্রাম' },
  { name: 'Sylhet', nameBn: 'সিলেট', slug: 'sylhet', division: 'Sylhet', divisionBn: 'সিলেট' },
  { name: 'Rajshahi', nameBn: 'রাজশাহী', slug: 'rajshahi', division: 'Rajshahi', divisionBn: 'রাজশাহী' },
  { name: 'Khulna', nameBn: 'খুলনা', slug: 'khulna', division: 'Khulna', divisionBn: 'খুলনা' },
  { name: 'Barishal', nameBn: 'বরিশাল', slug: 'barishal', division: 'Barishal', divisionBn: 'বরিশাল' },
  { name: 'Rangpur', nameBn: 'রংপুর', slug: 'rangpur', division: 'Rangpur', divisionBn: 'রংপুর' },
  { name: 'Mymensingh', nameBn: 'ময়মনসিংহ', slug: 'mymensingh', division: 'Mymensingh', divisionBn: 'ময়মনসিংহ' },
];

export const AD_PLACEMENTS = {
  TOP_BANNER: { label: 'Top Banner (Above Header)', labelBn: 'শীর্ষ ব্যানার' },
  HEADER: { label: 'Header Right Ad', labelBn: 'হেডার ডানদিকের বিজ্ঞাপন' },
  HOMEPAGE_HERO: { label: 'Homepage Hero Underlay', labelBn: 'হোমপেজ প্রধান বিজ্ঞাপন' },
  IN_FEED: { label: 'In-Feed Native Ad', labelBn: 'ফিড মধ্যবর্তী বিজ্ঞাপন' },
  ARTICLE_TOP: { label: 'Article Top Banner', labelBn: 'আর্টিকেল শীর্ষ ব্যানার' },
  ARTICLE_MIDDLE: { label: 'Article Middle Content Ad', labelBn: 'আর্টিকেল ভেতরের বিজ্ঞাপন' },
  ARTICLE_BOTTOM: { label: 'Article Bottom Ad', labelBn: 'আর্টিকেল নিচের বিজ্ঞাপন' },
  SIDEBAR: { label: 'Sidebar Sticky Ad', labelBn: 'সাইডবার বিজ্ঞাপন' },
  MOBILE_STICKY: { label: 'Mobile Bottom Sticky Ad', labelBn: 'মোবাইল বটম স্টিকি বিজ্ঞাপন' },
  FOOTER: { label: 'Footer Banner Ad', labelBn: 'ফুটার ব্যানার বিজ্ঞাপন' },
};

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/statboundnews',
  twitter: 'https://twitter.com/statboundnews',
  youtube: 'https://youtube.com/@statboundnews',
  linkedin: 'https://linkedin.com/company/statboundnews',
  instagram: 'https://instagram.com/statboundnews',
  whatsapp: 'https://wa.me/8801700000000',
};

export const CONTACT_INFO = {
  address: 'বাণিজ্যিক ভবন (লেভেল ৭), আগ্রাবাদ, চট্টগ্রাম / কাওরান বাজার, ঢাকা, বাংলাদেশ',
  phone: '+৮৮০ ১৭০০-০০০০০০, +৮৮০ ২-৯৮৭৬৫৪৩',
  email: 'news@statbound.com',
  editorEmail: 'editor@statbound.com',
  adEmail: 'advertise@statbound.com',
};

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0980-\u09FF-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

