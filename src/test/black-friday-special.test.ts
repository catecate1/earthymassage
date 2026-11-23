import { describe, expect, it } from "vitest";
import {
  BLACK_FRIDAY_END_MS,
  BLACK_FRIDAY_PRICE,
  BLACK_FRIDAY_START_MS,
  BLACK_FRIDAY_TERMS,
  BLACK_FRIDAY_TITLE,
  isBlackFridayLive,
} from "@/lib/black-friday-special";
import { easternTime } from "@/lib/discount-wheel";

describe("black friday special", () => {
  it("is not live before Nov 25", () => {
    expect(isBlackFridayLive(easternTime(2026, 11, 23, 0, 0, 0))).toBe(false);
  });

  it("is live from Wednesday Nov 25 so clients can book ahead", () => {
    expect(isBlackFridayLive(easternTime(2026, 11, 25, 0, 0, 0))).toBe(true);
  });

  it("is live on Thanksgiving Day", () => {
    expect(isBlackFridayLive(easternTime(2026, 11, 26, 0, 0, 0))).toBe(true);
  });

  it("is live on Black Friday", () => {
    expect(isBlackFridayLive(easternTime(2026, 11, 27, 12, 0, 0))).toBe(true);
  });

  it("is not live after Black Friday ends", () => {
    expect(isBlackFridayLive(easternTime(2026, 11, 28, 0, 0, 0))).toBe(false);
  });

  it("starts before it ends", () => {
    expect(BLACK_FRIDAY_START_MS).toBeLessThan(BLACK_FRIDAY_END_MS);
  });

  it("offers $20 off a 90-minute Swedish body-work session", () => {
    expect(BLACK_FRIDAY_TITLE).toContain("90 Minute Swedish Body-Work");
    expect(BLACK_FRIDAY_PRICE).toBe("$20 Off");
  });

  it("requires new clients to prepay", () => {
    expect(BLACK_FRIDAY_TERMS).toContain("New clients must prepay");
  });

  it("encourages booking ahead", () => {
    expect(BLACK_FRIDAY_TERMS).toContain("Book ahead");
  });
});
