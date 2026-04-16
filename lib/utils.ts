import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeSafeUrl(url: string | undefined): string {
  if (!url || !url.startsWith('http')) return url || '';
  
  try {
    const urlObj = new URL(url);
    // Encode only the pathname part to preserve protocol, hostname and search params
    const encodedPath = urlObj.pathname.split('/').map(segment => encodeURIComponent(segment)).join('/');
    return `${urlObj.protocol}//${urlObj.hostname}${encodedPath}${urlObj.search}`;
  } catch (e) {
    // Fallback if URL is invalid
    return url;
  }
}
