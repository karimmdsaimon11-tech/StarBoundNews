import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(prefix: string = "pix"): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
}

export function formatCredits(credits: number): string {
  return new Intl.NumberFormat().format(credits);
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return dateString;
  }
}

export function getCreditCost(
  type: 'standard' | 'pro' | 'vector' | 'upscale' | 'edit' | 'design' | string
): number {
  switch (type) {
    case 'PIXCRAFT_PRO':
    case 'pro':
      return 4;
    case 'PIXCRAFT_VECTOR':
    case 'vector':
      return 3;
    case 'upscale':
      return 2;
    case 'edit':
    case 'inpaint':
      return 3;
    case 'PIXCRAFT_DESIGN':
    case 'design':
      return 5;
    case 'PIXCRAFT_V1':
    case 'PIXCRAFT_V2':
    case 'standard':
    default:
      return 1;
  }
}
