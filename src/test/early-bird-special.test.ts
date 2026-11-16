import { describe, expect, it } from "vitest";
import {
  EARLY_BIRD_CODE,
  EARLY_BIRD_END_MS,
  EARLY_BIRD_START_MS,
  EARLY_BIRD_TERMS,
  isEarlyBirdLive,
} from "@/lib/early-bird-special";

describe("early-bird special window", () => {
  it("starts Monday, November 16 at midnight Eastern", () => {
    expect(EARLY_BIRD_START_MS).toBe(Date.UTC(2026, 10, 16, 5, 0, 0));
  });

  it("ends Friday, November 20 at 11:59:59 PM Eastern", () => {
    expect(EARLY_BIRD_END_MS).toBe(Date.UTC(2026, 10, 21, 4, 59, 59));
  });

  it("is not live before Monday morning", () => {
    expect(isEarlyBirdLive(EARLY_BIRD_START_MS - 1)).toBe(false);
  });

  it("is live during the week", () => {
    expect(isEarlyBirdLive(EARLY_BIRD_START_MS)).toBe(true);
    expect(isEarlyBirdLive(EARLY_BIRD_END_MS)).toBe(true);
  });

  it("is gone after Friday night", () => {
    expect(isEarlyBirdLive(EARLY_BIRD_END_MS + 1)).toBe(false);
  });

  it("requires booking between 8:00 AM and 11:30 AM", () => {
    expect(EARLY_BIRD_TERMS).toContain("8:00 AM and 11:30 AM");
  });

  it("shows the promo code 1090", () => {
    expect(EARLY_BIRD_CODE).toBe("1090");
    expect(EARLY_BIRD_TERMS).toContain("1090");
  });
});
