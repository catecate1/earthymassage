import { describe, expect, it } from "vitest";
import {
  PRICE_MATCH_CODE,
  PRICE_MATCH_END_MS,
  PRICE_MATCH_START_MS,
  PRICE_MATCH_TERMS,
  isPriceMatchLive,
} from "@/lib/price-match-special";

describe("price-match special window", () => {
  it("starts Monday, November 9 at midnight Eastern", () => {
    expect(PRICE_MATCH_START_MS).toBe(Date.UTC(2026, 10, 9, 5, 0, 0));
  });

  it("ends Saturday, November 14 at 11:59:59 PM Eastern", () => {
    expect(PRICE_MATCH_END_MS).toBe(Date.UTC(2026, 10, 15, 4, 59, 59));
  });

  it("is not live before Monday morning", () => {
    expect(isPriceMatchLive(PRICE_MATCH_START_MS - 1)).toBe(false);
  });

  it("is live during the week", () => {
    expect(isPriceMatchLive(PRICE_MATCH_START_MS)).toBe(true);
    expect(isPriceMatchLive(PRICE_MATCH_END_MS)).toBe(true);
  });

  it("is gone after Saturday night", () => {
    expect(isPriceMatchLive(PRICE_MATCH_END_MS + 1)).toBe(false);
  });

  it("carries the no-combining and no-back-to-back terms", () => {
    expect(PRICE_MATCH_TERMS).toContain("Cannot be combined with other discounts");
    expect(PRICE_MATCH_TERMS).toContain("No back-to-back appointments");
  });

  it("shows the promo code 75f60", () => {
    expect(PRICE_MATCH_CODE).toBe("75f60");
    expect(PRICE_MATCH_TERMS).toContain("75f60");
  });
});
