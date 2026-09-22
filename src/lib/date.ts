// Bangladesh Standard Time (BST) / Asia/Dhaka Utilities

const BANGLA_NUMERALS: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const BANGLA_MONTHS: { [key: number]: string } = {
  0: 'জানুয়ারি',
  1: 'ফেব্রুয়ারি',
  2: 'মার্চ',
  3: 'এপ্রিল',
  4: 'মে',
  5: 'জুন',
  6: 'জুলাই',
  7: 'আগস্ট',
  8: 'সেপ্টেম্বর',
  9: 'অক্টোবর',
  10: 'নভেম্বর',
  11: 'ডিসেম্বর',
};

const BANGLA_DAYS: { [key: number]: string } = {
  0: 'রবিবার',
  1: 'সোমবার',
  2: 'মঙ্গলবার',
  3: 'বুধবার',
  4: 'বৃহস্পতিবার',
  5: 'শুক্রবার',
  6: 'শনিবার',
};

export function toBanglaNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  return String(num).replace(/[0-9]/g, (digit) => BANGLA_NUMERALS[digit] || digit);
}

/**
 * Returns date formatted in BST (Asia/Dhaka) timezone
 */
export function getDhakaDate(dateInput?: Date | string | number | null): Date {
  const d = dateInput ? new Date(dateInput) : new Date();
  return d;
}

/**
 * Format date in Bengali editorial style: "২২ সেপ্টেম্বর ২০২৬, ১০:৪৫ অপরাহ্ন"
 */
export function formatBanglaDateTime(dateInput?: Date | string | number | null): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

  const day = getPart('day');
  const monthIdx = parseInt(getPart('month'), 10) - 1;
  const year = getPart('year');
  const hour = getPart('hour');
  const minute = getPart('minute');
  const dayPeriod = getPart('dayPeriod').toLowerCase();

  const banglaDay = toBanglaNumber(day);
  const banglaMonth = BANGLA_MONTHS[monthIdx] || '';
  const banglaYear = toBanglaNumber(year);
  const banglaHour = toBanglaNumber(hour);
  const banglaMinute = toBanglaNumber(minute.padStart(2, '0'));
  const banglaPeriod = dayPeriod === 'am' ? 'পূর্বাহ্ন' : 'অপরাহ্ন';

  return `${banglaDay} ${banglaMonth} ${banglaYear}, ${banglaHour}:${banglaMinute} ${banglaPeriod}`;
}

/**
 * Format date in English editorial style: "22 September 2026, 10:45 PM"
 */
export function formatEnglishDateTime(dateInput?: Date | string | number | null): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dhaka',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
}

/**
 * Format date in Bengali date only: "২২ সেপ্টেম্বর ২০২৬"
 */
export function formatBanglaDate(dateInput?: Date | string | number | null): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

  const dayNum = parseInt(getPart('day'), 10);
  const monthIdx = parseInt(getPart('month'), 10) - 1;
  const yearNum = getPart('year');

  return `${toBanglaNumber(dayNum)} ${BANGLA_MONTHS[monthIdx]} ${toBanglaNumber(yearNum)}`;
}

/**
 * Format date only in Bengali with weekday: "মঙ্গলবার, ২২ সেপ্টেম্বর ২০২৬"
 */
export function formatBanglaFullDate(dateInput?: Date | string | number | null): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  
  // weekday 0-6 in BST
  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

  const dayNum = parseInt(getPart('day'), 10);
  const monthIdx = parseInt(getPart('month'), 10) - 1;
  const yearNum = getPart('year');
  const weekdayIndex = date.toLocaleDateString('en-US', { timeZone: 'Asia/Dhaka', weekday: 'short' });
  const weekdayMap: { [key: string]: string } = {
    Sun: 'রবিবার',
    Mon: 'সোমবার',
    Tue: 'মঙ্গলবার',
    Wed: 'বুধবার',
    Thu: 'বৃহস্পতিবার',
    Fri: 'শুক্রবার',
    Sat: 'শনিবার',
  };

  const dayName = weekdayMap[weekdayIndex] || 'আজ';
  return `${dayName}, ${toBanglaNumber(dayNum)} ${BANGLA_MONTHS[monthIdx]} ${toBanglaNumber(yearNum)}`;
}

/**
 * Format time only in Bengali: "১০:৪৫ অপরাহ্ন"
 */
export function formatBanglaTime(dateInput?: Date | string | number | null): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).formatToParts(date);

  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';
  const hour = toBanglaNumber(getPart('hour'));
  const minute = toBanglaNumber(getPart('minute').padStart(2, '0'));
  const period = getPart('dayPeriod').toLowerCase() === 'am' ? 'পূর্বাহ্ন' : 'অপরাহ্ন';

  return `${hour}:${minute} ${period}`;
}

/**
 * Relative time in Bengali: "১০ মিনিট আগে", "২ ঘণ্টা আগে"
 */
export function getBanglaRelativeTime(dateInput?: Date | string | number | null): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'এইমাত্র';
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${toBanglaNumber(diffInMinutes)} মিনিট আগে`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${toBanglaNumber(diffInHours)} ঘণ্টা আগে`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${toBanglaNumber(diffInDays)} দিন আগে`;
  }
  return formatBanglaDateTime(date);
}

/**
 * Get current date string in YYYY-MM-DD format in Asia/Dhaka timezone
 */
export function getDhakaCurrentDateStr(): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(new Date()); // Returns "YYYY-MM-DD"
}

/**
 * Get start and end of day in Asia/Dhaka timezone
 */
export function getDhakaDayBoundaries(dateStr?: string): { startOfDay: Date; endOfDay: Date } {
  const targetDateStr = dateStr || getDhakaCurrentDateStr();
  // BST is UTC+6
  const startOfDay = new Date(`${targetDateStr}T00:00:00+06:00`);
  const endOfDay = new Date(`${targetDateStr}T23:59:59.999+06:00`);

  return { startOfDay, endOfDay };
}
