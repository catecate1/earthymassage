import { easternTime } from "@/lib/discount-wheel";

/**
 * Price-match special: a 75-minute Swedish body-work session for the
 * 60-minute price ($50 instead of $65). Runs Monday Nov 9 through
 * Saturday Nov 14, 2026, 11:59 PM Eastern. No promo code — the
 * therapist applies it at booking.
 */
export const PRICE_MATCH_START_MS = easternTime(2026, 11, 9, 0, 0, 0);
export const PRICE_MATCH_END_MS = easternTime(2026, 11, 14, 23, 59, 59);

export const PRICE_MATCH_TITLE = "75 Minute Swedish Body-Work";
export const PRICE_MATCH_PRICE = "60 Minute Price — $50";
export const PRICE_MATCH_TERMS =
  "Monday, November 9 through Saturday, November 14 only. Cannot be combined with other discounts. No back-to-back appointments.";

export function isPriceMatchLive(now: number = Date.now()): boolean {
  return now >= PRICE_MATCH_START_MS && now <= PRICE_MATCH_END_MS;
}
