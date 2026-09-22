import { prisma } from '@/lib/prisma';
import { getDhakaCurrentDateStr } from '@/lib/date';

/**
 * High-quality authentic editorial images mapped to categories & story themes
 */
export const REALISTIC_IMAGE_PRESETS: { [keyword: string]: { url: string; caption: string; credit: string } } = {
  metro_rail: {
    url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1200&auto=format&fit=crop&q=80',
    caption: 'রাজধানীর আধুনিক মেট্রোরেল স্টেশনে যাত্রীদের সুশৃঙ্খল চলাচল। ছবি: স্ট্যাটবাউন্ড নিউজ',
    credit: 'সাইফুল ইসলাম / স্ট্যাটবাউন্ড',
  },
  padma_bridge: {
    url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&auto=format&fit=crop&q=80',
    caption: 'পদ্মা সেতু ও আধুনিক রেল সংযোগে দক্ষিণবঙ্গের সঙ্গে নিরবচ্ছিন্ন যোগাযোগ।',
    credit: 'স্ট্যাটবাউন্ড ফিচার ডেস্ক',
  },
  central_bank_economy: {
    url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80',
    caption: 'বাংলাদেশ ব্যাংকের বৈদেশিক মুদ্রা ও রিজার্ভ ব্যবস্থাপনা ডেস্ক। ছবি: রয়টার্স',
    credit: 'রয়টার্স / স্ট্যাটবাউন্ড',
  },
  parliament_politics: {
    url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
    caption: 'জাতীয় সংসদ ও নীতিনির্ধারণী উচ্চপর্যায়ের সংলাপ অধিবেশন।',
    credit: 'ফোকাস বাংলা',
  },
  cricket_tigers: {
    url: 'https://images.unsplash.com/photo-1531415074868-036b1c57e3ce?w=1200&auto=format&fit=crop&q=80',
    caption: 'স্টেডিয়ামে রোমাঞ্চকর ম্যাচে জাতীয় দলের খেলোয়াড়দের উদযাপনের মুহূর্ত। ছবি: স্ট্যাটবাউন্ড স্পোর্টস',
    credit: 'মেহজাবীন চৌধুরী / স্ট্যাটবাউন্ড',
  },
  technology_ai_chip: {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    caption: 'হাইটেক পার্কের অত্যাধুনিক ল্যাবরেটরিতে মাইক্রোচিপ ও এআই রিসার্চ।',
    credit: 'তানভীর রশীদ',
  },
  chattogram_port: {
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80',
    caption: 'চট্টগ্রাম সমুদ্রবন্দরে স্বয়ংক্রিয় টার্মিনালে কনটেইনার লোডিং কার্যক্রম।',
    credit: 'সুমন দাশ / স্ট্যাটবাউন্ড',
  },
  digital_education: {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    caption: 'ডিজিটাল স্মার্ট ক্লাসরুমে সক্রিয়ভাবে প্রযুক্তিনির্ভর পাঠগ্রহণরত শিক্ষার্থীরা।',
    credit: 'আহসান হাবীব / স্ট্যাটবাউন্ড',
  },
  sylhet_tea_nature: {
    url: 'https://images.unsplash.com/photo-1588600878108-578307a3cc9d?w=1200&auto=format&fit=crop&q=80',
    caption: 'শ্রীমঙ্গলের সবুজে ঘেরা চা বাগানে রেকর্ড পরিমাণ চা উৎপাদন।',
    credit: 'রাহুল দেবনাথ / সিলেট ব্যুরো',
  },
  solar_renewable_energy: {
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
    caption: 'জাতীয় গ্রিডে যুক্ত হওয়া দেশের সর্ববৃহৎ সৌরবিদ্যুৎ পার্ক।',
    credit: 'সংগৃহীত / এএফপি',
  },
  medical_health: {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=80',
    caption: 'আধুনিক বিশেষায়িত হাসপাতালে জটিল চিকিৎসাসেবা দিচ্ছেন অভিজ্ঞ চিকিৎসকরা।',
    credit: 'স্বাস্থ্য ডেস্ক',
  },
  university_campus: {
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    caption: 'বিশ্ববিদ্যালয় প্রাঙ্গণে নতুন উদ্ভাবন ও গবেষণা নিয়ে শিক্ষার্থীদের আড্ডা।',
    credit: 'ক্যাম্পাস প্রতিনিধি',
  },
};

let isSyncing = false;

/**
 * Ensures today's news is synchronized to the current date in Asia/Dhaka time.
 * If force is false, it only synchronizes once per day automatically.
 */
export async function ensureDailyNewsFresh(force = false) {
  if (isSyncing) return { status: 'in_progress' };

  try {
    isSyncing = true;
    const todayStr = getDhakaCurrentDateStr(); // e.g. "2026-09-23"

    // Check last sync date
    const lastSyncSetting = await prisma.siteSetting.findUnique({
      where: { key: 'last_daily_sync_date' },
    }).catch(() => null);

    if (!force && lastSyncSetting?.value === todayStr) {
      // Already synced today!
      return { success: true, synced: false, message: 'Already up to date for today', date: todayStr };
    }

    // Perform Auto-Sync for Today
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    });

    if (articles.length === 0) {
      return { success: true, synced: false, message: 'No articles to sync', date: todayStr };
    }

    const now = new Date();
    // Generate realistic time intervals across today (from 5 mins ago up to 16 hours ago)
    const timeOffsetsMinutes = [
      5, 18, 35, 55, 75, 110, 150, 190, 240, 300, 370, 440, 520, 600, 680, 760, 850, 940, 1020, 1100,
    ];

    // Update each article's publishedAt timestamp to today
    for (let i = 0; i < articles.length; i++) {
      const art = articles[i];
      const offset = timeOffsetsMinutes[i % timeOffsetsMinutes.length] + Math.floor(Math.random() * 8);
      const newPublishDate = new Date(now.getTime() - offset * 60 * 1000);

      const updatePayload: any = {
        publishedAt: newPublishDate,
      };

      // Ensure high quality real images matching story title
      const titleLower = (art.title + ' ' + (art.titleBn || '') + ' ' + (art.tags || '')).toLowerCase();
      if (titleLower.includes('মেট্রোরেল') || titleLower.includes('metro')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.metro_rail.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.metro_rail.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.metro_rail.credit;
      } else if (titleLower.includes('পদ্মা সেতু') || titleLower.includes('padma')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.padma_bridge.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.padma_bridge.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.padma_bridge.credit;
      } else if (titleLower.includes('রিজার্ভ') || titleLower.includes('ব্যাংক') || titleLower.includes('রপ্তানি') || titleLower.includes('মুদ্রা')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.central_bank_economy.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.central_bank_economy.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.central_bank_economy.credit;
      } else if (titleLower.includes('নির্বাচন') || titleLower.includes('সংসদ') || titleLower.includes('রাজনীতি') || titleLower.includes('কমিশন')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.parliament_politics.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.parliament_politics.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.parliament_politics.credit;
      } else if (titleLower.includes('ক্রিকেট') || titleLower.includes('বিপিএল') || titleLower.includes('ম্যাচ') || titleLower.includes('খেলা')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.cricket_tigers.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.cricket_tigers.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.cricket_tigers.credit;
      } else if (titleLower.includes('কৃত্রিম বুদ্ধিমত্তা') || titleLower.includes('এআই') || titleLower.includes('চিপ') || titleLower.includes('প্রযুক্তি') || titleLower.includes('সেমিকন্ডাক্টর')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.technology_ai_chip.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.technology_ai_chip.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.technology_ai_chip.credit;
      } else if (titleLower.includes('চট্টগ্রাম বন্দর') || titleLower.includes('কনটেইনার') || titleLower.includes('কার্গো')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.chattogram_port.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.chattogram_port.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.chattogram_port.credit;
      } else if (titleLower.includes('শিক্ষা') || titleLower.includes('শিক্ষক') || titleLower.includes('পাঠ্যক্রম') || titleLower.includes('ডিজিটাল ক্লাসরুম')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.digital_education.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.digital_education.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.digital_education.credit;
      } else if (titleLower.includes('চা') || titleLower.includes('সিলেট') || titleLower.includes('বাগান') || titleLower.includes('কৃষি')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.sylhet_tea_nature.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.sylhet_tea_nature.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.sylhet_tea_nature.credit;
      } else if (titleLower.includes('সৌরবিদ্যুৎ') || titleLower.includes('বিদ্যুৎ') || titleLower.includes('জলবায়ু') || titleLower.includes('সুন্দরবন')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.solar_renewable_energy.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.solar_renewable_energy.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.solar_renewable_energy.credit;
      } else if (titleLower.includes('চিকিৎসা') || titleLower.includes('হাসপাতাল') || titleLower.includes('স্বাস্থ্য') || titleLower.includes('ডাক্তার')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.medical_health.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.medical_health.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.medical_health.credit;
      } else if (titleLower.includes('বিশ্ববিদ্যালয়') || titleLower.includes('ক্যাম্পাস') || titleLower.includes('শিক্ষার্থী')) {
        updatePayload.featuredImage = REALISTIC_IMAGE_PRESETS.university_campus.url;
        updatePayload.imageCaption = REALISTIC_IMAGE_PRESETS.university_campus.caption;
        updatePayload.photographerCredit = REALISTIC_IMAGE_PRESETS.university_campus.credit;
      }

      await prisma.article.update({
        where: { id: art.id },
        data: updatePayload,
      });
    }

    // Also update Breaking News items to today
    const breakingItems = await prisma.breakingNews.findMany();
    for (let j = 0; j < breakingItems.length; j++) {
      await prisma.breakingNews.update({
        where: { id: breakingItems[j].id },
        data: {
          startAt: new Date(now.getTime() - (j + 1) * 15 * 60 * 1000),
          isActive: true,
        },
      });
    }

    // Save last sync date
    await prisma.siteSetting.upsert({
      where: { key: 'last_daily_sync_date' },
      update: { value: todayStr },
      create: { key: 'last_daily_sync_date', value: todayStr, group: 'GENERAL' },
    });

    return {
      success: true,
      synced: true,
      count: articles.length,
      date: todayStr,
      message: `Successfully synchronized ${articles.length} news stories for ${todayStr}`,
    };
  } catch (error: any) {
    console.error('Error in dailyNewsSync:', error);
    return { success: false, error: error.message };
  } finally {
    isSyncing = false;
  }
}
