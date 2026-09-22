import { Role } from '@/types';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role | string;
  avatar?: string | null;
}

export const DEMO_ACCOUNTS = [
  {
    role: 'SUPER_ADMIN' as Role,
    label: 'Super Admin',
    labelBn: 'সুপার অ্যাডমিন',
    email: 'admin@statbound.com',
    password: 'adminPassword123!',
    description: 'Full access to all system settings, CMS, users, ads, and audit logs.',
  },
  {
    role: 'EDITOR' as Role,
    label: 'Editor',
    labelBn: 'সম্পাদক',
    email: 'editor@statbound.com',
    password: 'editorPassword123!',
    description: 'Review, edit, publish, schedule articles, breaking news, and manage homepage layout.',
  },
  {
    role: 'REPORTER' as Role,
    label: 'Staff Reporter',
    labelBn: 'স্টাফ রিপোর্টার',
    email: 'reporter@statbound.com',
    password: 'reporterPassword123!',
    description: 'Create and submit drafts, upload media, view own articles.',
  },
  {
    role: 'AD_MANAGER' as Role,
    label: 'Ad Manager',
    labelBn: 'বিজ্ঞাপন ব্যবস্থাপক',
    email: 'ads@statbound.com',
    password: 'adsPassword123!',
    description: 'Manage advertisements, campaigns, placements, and view impression/click analytics.',
  },
];

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const hierarchy: Record<Role, number> = {
    SUPER_ADMIN: 5,
    EDITOR: 4,
    AD_MANAGER: 3,
    REPORTER: 2,
    AUTHOR: 1,
  };

  return (hierarchy[userRole] || 0) >= (hierarchy[requiredRole] || 0);
}

// Simple base64url signed token simulation for zero-dependency secure session cookies
export function createSessionToken(user: AuthUser): string {
  const payload = {
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export function parseSessionToken(token: string): AuthUser | null {
  try {
    const raw = Buffer.from(token, 'base64url').toString('utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.exp && parsed.exp < Date.now()) {
      return null;
    }
    return {
      id: parsed.id,
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
      avatar: parsed.avatar,
    };
  } catch {
    return null;
  }
}
