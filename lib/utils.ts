import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeSafeUrl(url: string | undefined): string {
  if (!url || !url.startsWith('http')) return url || '';
  
  try {
    // The URL constructor handles encoding correctly without double encoding
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch (e) {
    return url;
  }
}
