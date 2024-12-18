import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DeviceType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDeviceType(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua)) {
    return "tablet";
  } else if (/mobile|android|ip(hone|od)|samsung|nokia/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

export function calculateExpiryDate(expiresIn: "1d" | "7d" | "30d"): Date {
  const days = parseInt(expiresIn);
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export const getExpirationValue = (expiresAt: Date | null) => {
  if (!expiresAt) return "never";

  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (daysRemaining <= 1) return "1d";
  if (daysRemaining <= 7) return "7d";
  if (daysRemaining <= 30) return "30d";
  return "never";
};
