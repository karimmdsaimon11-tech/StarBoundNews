export const ArticleStatus = {
  DRAFT: 'DRAFT',
  PENDING_REVIEW: 'PENDING_REVIEW',
  SCHEDULED: 'SCHEDULED',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus];

export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  EDITOR: 'EDITOR',
  REPORTER: 'REPORTER',
  AUTHOR: 'AUTHOR',
  AD_MANAGER: 'AD_MANAGER',
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export type UserRole = Role;

export const CommentStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  FLAGGED: 'FLAGGED',
} as const;
export type CommentStatus = (typeof CommentStatus)[keyof typeof CommentStatus];


export type AdPlacement =
  | 'TOP_BANNER'
  | 'HEADER'
  | 'HOMEPAGE_HERO'
  | 'IN_FEED'
  | 'ARTICLE_TOP'
  | 'ARTICLE_MIDDLE'
  | 'ARTICLE_BOTTOM'
  | 'SIDEBAR'
  | 'MOBILE_STICKY'
  | 'FOOTER';

export interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  description?: string | null;
  order: number;
  icon?: string | null;
  isNav: boolean;
  color?: string | null;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  categoryId: string;
  order: number;
}

export interface Author {
  id: string;
  name: string;
  nameBn?: string | null;
  slug: string;
  email?: string | null;
  designation: string;
  designationBn?: string | null;
  avatar?: string | null;
  bio?: string | null;
  bioBn?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
}

export interface District {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  division: string;
  divisionBn: string;
  order: number;
}

export interface Article {
  id: string;
  title: string;
  titleBn?: string | null;
  slug: string;
  subtitle?: string | null;
  excerpt: string;
  content: string;
  featuredImage: string;
  imageCaption?: string | null;
  photographerCredit?: string | null;
  categoryId: string;
  category?: Category;
  subcategoryId?: string | null;
  subcategory?: Subcategory | null;
  authorId: string;
  author?: Author;
  districtId?: string | null;
  district?: District | null;
  opinionAuthorId?: string | null;
  opinionAuthor?: Author | null;
  tags?: string | null;
  status: ArticleStatus | string;
  isBreaking: boolean;
  isHero: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isOpinion: boolean;
  isEditorial: boolean;
  viewsCount: number;
  readTimeMinutes: number;
  seoTitle?: string | null;
  seoDescription?: string | null;
  focusKeyword?: string | null;
  canonicalUrl?: string | null;
  scheduledAt?: string | Date | null;
  publishedAt?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface BreakingNewsItem {
  id: string;
  headline: string;
  headlineBn?: string | null;
  url?: string | null;
  articleId?: string | null;
  article?: Article | null;
  isActive: boolean;
  priority: number;
  startAt?: string | Date | null;
  endAt?: string | Date | null;
  createdAt: string | Date;
}

export interface Advertisement {
  id: string;
  name: string;
  advertiser: string;
  imageUrl: string;
  targetUrl: string;
  placement: AdPlacement | string;
  deviceTargeting: 'ALL' | 'DESKTOP' | 'MOBILE';
  impressionsCount: number;
  clicksCount: number;
  isActive: boolean;
  priority: number;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
}

export interface VideoStory {
  id: string;
  title: string;
  titleBn?: string | null;
  slug: string;
  description?: string | null;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  categoryId?: string | null;
  category?: Category | null;
  isFeatured: boolean;
  viewsCount: number;
  publishedAt: string | Date;
}

export interface PhotoGallery {
  id: string;
  title: string;
  titleBn?: string | null;
  slug: string;
  description?: string | null;
  coverImage: string;
  photographerCredit?: string | null;
  publishedAt: string | Date;
  images?: PhotoGalleryImage[];
}

export interface PhotoGalleryImage {
  id: string;
  galleryId: string;
  imageUrl: string;
  caption?: string | null;
  photographerCredit?: string | null;
  order: number;
}

export interface Comment {
  id: string;
  articleId: string;
  name: string;
  email: string;
  content: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED' | string;
  createdAt: string | Date;
}
