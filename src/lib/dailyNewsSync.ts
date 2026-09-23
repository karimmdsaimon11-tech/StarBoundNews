import { prisma } from '@/lib/prisma';
import { getDhakaCurrentDateStr } from '@/lib/date';
import { syncLiveRssNews } from '@/lib/newsFetcher';

let isSyncing = false;

/**
 * Ensures daily news is fresh by fetching real news from live RSS feeds,
 * saving them to the database, preventing duplicates, and sorting by publication date.
 */
export async function ensureDailyNewsFresh(force = false) {
  if (isSyncing) return { status: 'in_progress' };

  try {
    isSyncing = true;
    const todayStr = getDhakaCurrentDateStr();

    const lastSyncSetting = await prisma.siteSetting
      .findUnique({
        where: { key: 'last_daily_sync_date' },
      })
      .catch(() => null);

    // Sync real news from live feeds
    const syncResult = await syncLiveRssNews();

    // Update site setting timestamp
    await prisma.siteSetting.upsert({
      where: { key: 'last_daily_sync_date' },
      update: { value: todayStr },
      create: { key: 'last_daily_sync_date', value: todayStr, group: 'GENERAL' },
    });

    const totalArticles = await prisma.article.count({
      where: { status: 'PUBLISHED' },
    });

    return {
      success: true,
      synced: true,
      date: todayStr,
      insertedCount: syncResult.totalInserted,
      totalFetched: syncResult.totalFetched,
      totalPublishedArticles: totalArticles,
      categoriesSynced: syncResult.categoriesSynced,
      message: `Successfully synchronized ${syncResult.totalInserted} new real articles. Total published: ${totalArticles}.`,
    };
  } catch (error: any) {
    console.error('Error in ensureDailyNewsFresh:', error);
    return { success: false, error: error.message };
  } finally {
    isSyncing = false;
  }
}

