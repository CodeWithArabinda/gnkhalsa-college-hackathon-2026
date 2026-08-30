import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(prefix = "item"): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}-${Date.now().toString(36)}`;
}

export function sanitizeUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }
  if (trimmed.includes("@") && !trimmed.includes("/")) {
    return `mailto:${trimmed}`;
  }
  if (trimmed.startsWith("github.com") || trimmed.startsWith("linkedin.com") || trimmed.includes(".com") || trimmed.includes(".io") || trimmed.includes(".dev") || trimmed.includes(".me")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export function formatDateRange(start?: string, end?: string): string {
  if (!start && !end) return "";
  if (start && !end) return start;
  if (!start && end) return end;
  return `${start} — ${end}`;
}
