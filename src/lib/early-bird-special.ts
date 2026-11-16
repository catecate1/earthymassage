import { easternTime } from "@/lib/discount-wheel";

/**
 * Early-bird special: $10 off a 90-minute Swedish body-work session.
 * Runs Monday Nov 16 through Friday Nov 20, 2026, 11:59 PM Eastern.
 * Appointments must start between 8:00 AM and 11:30 AM.
 */
export const EARLY_BIRD_START_MS = easternTime(2026, 11, 16, 0, 0, 0);
export const EARLY_BIRD_END_MS = easternTime(2026, 11, 20, 23, 59, 59);

export const EARLY_BIRD_TITLE = "90 Minute Swedish Body-Work";
export const EARLY_BIRD_PRICE = "$10 Off";
export const EARLY_BIRD_CODE = "1090";
export const EARLY_BIRD_TERMS =
  "Monday, November 16 through Friday, November 20 only. Appointments must start between 8:00 AM and 11:30 AM. Use promo code 1090 when booking online.";

export function isEarlyBirdLive(now: number = Date.now()): boolean {
  return now >= EARLY_BIRD_START_MS && now <= EARLY_BIRD_END_MS;
}
