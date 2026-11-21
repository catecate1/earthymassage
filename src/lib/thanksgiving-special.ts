import { easternTime } from "@/lib/discount-wheel";

/**
 * Thanksgiving special: 40% off a 60, 75, or 90-minute Swedish body-work
 * session. Runs Saturday Nov 21 through Sunday Nov 22, 2026, 11:59 PM
 * Eastern. New clients must prepay online or by phone.
 */
export const THANKSGIVING_START_MS = easternTime(2026, 11, 21, 0, 0, 0);
export const THANKSGIVING_END_MS = easternTime(2026, 11, 22, 23, 59, 59);

export const THANKSGIVING_TITLE = "60, 75 or 90 Minute Swedish Body-Work";
export const THANKSGIVING_PRICE = "40% Off";
export const THANKSGIVING_CODE = "tg679";
export const THANKSGIVING_TERMS =
  "Saturday, November 21 and Sunday, November 22 only. Use promo code tg679 when booking online. No back-to-back appointments. New clients must prepay for this special online or by phone.";

export function isThanksgivingLive(now: number = Date.now()): boolean {
  return now >= THANKSGIVING_START_MS && now <= THANKSGIVING_END_MS;
}
