import type { Metadata } from 'next';
import './globals.css';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/constants';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'স্ট্যাটবাউন্ড নিউজ — প্রতিদিনের খবর, নির্ভরযোগ্য তথ্য। রাজনীতি, জাতীয়, আন্তর্জাতিক, শিক্ষা, অর্থনীতি, প্রযুক্তি ও খেলাধুলার বস্তুনিষ্ঠ খবর।',
  keywords: [
    'Bangla News',
    'Bangladesh Newspaper',
    'StatBound News',
    'বাংলাদেশ সংবাদ',
    'সর্বশেষ খবর',
    'চট্টগ্রাম সংবাদ',
    'অনলাইন পত্রিকা',
  ],
  authors: [{ name: 'StatBound Newsroom' }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: 'প্রতিদিনের খবর, নির্ভরযোগ্য তথ্য। সত্য ও বস্তুনিষ্ঠতায় আপসহীন ডিজিটাল সংবাদপত্র।',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_TAGLINE,
    creator: '@statboundnews',
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-newspaper-blue/20 selection:text-newspaper-navy dark:selection:bg-blue-600/30 dark:selection:text-white">
        {children}
      </body>
    </html>
  );
}
