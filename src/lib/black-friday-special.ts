import { easternTime } from "@/lib/discount-wheel";

/**
 * Thanksgiving & Black Friday special: $20 off a 90-minute Swedish
 * body-work session, good Thursday Nov 26 and Friday Nov 27, 2026.
 * The card shows from Monday Nov 23 so clients can book ahead, and
 * comes down Friday Nov 27 at 11:59 PM Eastern. New clients must
 * prepay online or by phone.
 */
export const BLACK_FRIDAY_START_MS = easternTime(2026, 11, 23, 0, 0, 0);
export const BLACK_FRIDAY_END_MS = easternTime(2026, 11, 27, 23, 59, 59);

export const BLACK_FRIDAY_TITLE = "90 Minute Swedish Body-Work";
export const BLACK_FRIDAY_PRICE = "$20 Off";
export const BLACK_FRIDAY_TERMS =
  "Thanksgiving Day and Black Friday only — Thursday, November 26 and Friday, November 27. Book ahead to reserve your spot. No back-to-back appointments. New clients must prepay for this special online or by phone.";

export function isBlackFridayLive(now: number = Date.now()): boolean {
  return now >= BLACK_FRIDAY_START_MS && now <= BLACK_FRIDAY_END_MS;
}
