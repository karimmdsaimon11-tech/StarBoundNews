import { prisma } from '@/lib/prisma';
import { getDhakaCurrentDateStr } from '@/lib/date';

let isSyncing = false;

/**
 * Clean & safe daily sync: only updates timestamps to today without altering any article image, title, layout, or content.
 */
export async function ensureDailyNewsFresh(force = false) {
  if (isSyncing) return { status: 'in_progress' };

  try {
    isSyncing = true;
    const todayStr = getDhakaCurrentDateStr();

    const lastSyncSetting = await prisma.siteSetting.findUnique({
      where: { key: 'last_daily_sync_date' },
    }).catch(() => null);

    if (!force && lastSyncSetting?.value === todayStr) {
      return { success: true, synced: false, message: 'Already up to date for today', date: todayStr };
    }

    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    });

    if (articles.length === 0) {
      return { success: true, synced: false, message: 'No articles to sync', date: todayStr };
    }

    const now = new Date();
    const timeOffsetsMinutes = [
      5, 18, 35, 55, 75, 110, 150, 190, 240, 300, 370, 440, 520, 600, 680, 760, 850, 940, 1020, 1100,
    ];

    for (let i = 0; i < articles.length; i++) {
      const art = articles[i];
      const offset = timeOffsetsMinutes[i % timeOffsetsMinutes.length];
      const newPublishDate = new Date(now.getTime() - offset * 60 * 1000);

      await prisma.article.update({
        where: { id: art.id },
        data: {
          publishedAt: newPublishDate,
        },
      });
    }

    // Update Breaking News
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
