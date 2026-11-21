import { describe, expect, it } from "vitest";
import {
  THANKSGIVING_CODE,
  THANKSGIVING_END_MS,
  THANKSGIVING_PRICE,
  THANKSGIVING_START_MS,
  THANKSGIVING_TERMS,
  THANKSGIVING_TITLE,
  isThanksgivingLive,
} from "@/lib/thanksgiving-special";

describe("thanksgiving special window", () => {
  it("starts Saturday, November 21 at midnight Eastern", () => {
    expect(THANKSGIVING_START_MS).toBe(Date.UTC(2026, 10, 21, 5, 0, 0));
  });

  it("ends Sunday, November 22 at 11:59:59 PM Eastern", () => {
    expect(THANKSGIVING_END_MS).toBe(Date.UTC(2026, 10, 23, 4, 59, 59));
  });

  it("is not live before Saturday morning", () => {
    expect(isThanksgivingLive(THANKSGIVING_START_MS - 1)).toBe(false);
  });

  it("is live during the weekend", () => {
    expect(isThanksgivingLive(THANKSGIVING_START_MS)).toBe(true);
    expect(isThanksgivingLive(THANKSGIVING_END_MS)).toBe(true);
  });

  it("is gone after Sunday night", () => {
    expect(isThanksgivingLive(THANKSGIVING_END_MS + 1)).toBe(false);
  });

  it("shows the promo code tg679", () => {
    expect(THANKSGIVING_CODE).toBe("tg679");
    expect(THANKSGIVING_TERMS).toContain("tg679");
  });

  it("carries the no-back-to-back and new-client prepay terms", () => {
    expect(THANKSGIVING_TERMS).toContain("No back-to-back appointments");
    expect(THANKSGIVING_TERMS).toContain(
      "New clients must prepay for this special online or by phone",
    );
  });

  it("covers 60, 75 and 90 minutes at 40% off", () => {
    expect(THANKSGIVING_PRICE).toBe("40% Off");
    expect(THANKSGIVING_TITLE).toContain("60, 75 or 90 Minute");
  });
});
