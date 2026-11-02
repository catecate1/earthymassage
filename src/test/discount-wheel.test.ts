import { describe, expect, it } from "vitest";
import {
  BLANK_RESULT_MESSAGE,
  SEGMENTS,
  SEGMENT_COUNT,
  SPIN_COOLDOWN_MS,
  WHEEL_END_MS,
  WHEEL_START_MS,
  canSpin,
  easternTime,
  formatCountdown,
  isWheelLive,
  nextSpinAt,
  pickSegmentIndex,
  resultMessage,
} from "@/lib/discount-wheel";

const HOUR = 60 * 60 * 1000;

describe("discount wheel sections", () => {
  it("has eight sections: two of each prize and four blanks", () => {
    expect(SEGMENTS).toHaveLength(SEGMENT_COUNT);
    const blanks = SEGMENTS.filter((s) => s.kind === "blank");
    const sixty = SEGMENTS.filter((s) => s.kind === "prize" && s.minutes === 60);
    const seventyFive = SEGMENTS.filter((s) => s.kind === "prize" && s.minutes === 75);
    expect(blanks).toHaveLength(4);
    expect(sixty).toHaveLength(2);
    expect(seventyFive).toHaveLength(2);
  });

  it("uses the codes the therapist supplied", () => {
    expect(SEGMENTS.filter((s) => s.minutes === 60).every((s) => s.code === "ad1060")).toBe(true);
    expect(SEGMENTS.filter((s) => s.minutes === 75).every((s) => s.code === "ad7510")).toBe(true);
  });

  it("alternates prizes and blanks so blanks are spread around the wheel", () => {
    SEGMENTS.forEach((segment, index) => {
      expect(segment.kind).toBe(index % 2 === 0 ? "prize" : "blank");
    });
  });
});

describe("discount wheel timing", () => {
  it("waits 12 hours between spins", () => {
    expect(SPIN_COOLDOWN_MS).toBe(12 * HOUR);
    const last = easternTime(2026, 11, 2, 9, 0, 0);
    expect(nextSpinAt(last)).toBe(last + 12 * HOUR);
  });

  it("blocks a second spin inside the 12 hour wait and allows it after", () => {
    const now = easternTime(2026, 11, 3, 15, 0, 0);
    expect(canSpin(null, now)).toBe(true);
    expect(canSpin(now - 11 * HOUR, now)).toBe(false);
    expect(canSpin(now - 12 * HOUR + 1, now)).toBe(false);
    expect(canSpin(now - 12 * HOUR, now)).toBe(true);
  });

  it("runs Monday November 2 through Sunday November 8 at 11:59 PM Eastern", () => {
    // 11:59:59 PM Eastern on Nov 8 2026 is 04:59:59 UTC on Nov 9 (EST, UTC-5).
    expect(WHEEL_END_MS).toBe(Date.UTC(2026, 10, 9, 4, 59, 59));
    expect(isWheelLive(WHEEL_START_MS)).toBe(true);
    expect(isWheelLive(WHEEL_END_MS)).toBe(true);
    expect(isWheelLive(WHEEL_END_MS + 1000)).toBe(false);
    expect(isWheelLive(WHEEL_START_MS - 1000)).toBe(false);
  });
});

describe("discount wheel wording", () => {
  it("tells a blank spinner to try again tomorrow", () => {
    const blank = SEGMENTS.find((s) => s.kind === "blank")!;
    expect(resultMessage(blank)).toBe(BLANK_RESULT_MESSAGE);
    expect(BLANK_RESULT_MESSAGE.toLowerCase()).toContain("try again tomorrow");
  });

  it("names the prize and never invents a discount amount", () => {
    const sixty = SEGMENTS.find((s) => s.minutes === 60)!;
    const seventyFive = SEGMENTS.find((s) => s.minutes === 75)!;
    expect(resultMessage(sixty)).toContain("10% off a 60-minute session");
    expect(resultMessage(seventyFive)).toContain("10% off a 75-minute session");
    expect(resultMessage(sixty)).not.toContain("35%");
  });

  it("counts the wait down in plain language", () => {
    expect(formatCountdown(3 * HOUR + 25 * 60000)).toBe("3 hours 25 minutes");
    expect(formatCountdown(45 * 60000)).toBe("45 minutes");
    expect(formatCountdown(30 * 1000)).toBe("less than a minute");
  });
});

describe("discount wheel spin selection", () => {
  it("can stop on every one of the eight sections", () => {
    const picks = new Set<number>();
    for (let i = 0; i < SEGMENT_COUNT; i += 1) {
      picks.add(pickSegmentIndex(() => (i + 0.5) / SEGMENT_COUNT));
    }
    expect(picks.size).toBe(SEGMENT_COUNT);
  });

  it("keeps the odd chance honest: half the sections pay nothing", () => {
    const blanks = SEGMENTS.filter((s) => s.kind === "blank").length;
    expect(blanks / SEGMENT_COUNT).toBe(0.5);
  });

  it("falls back to section zero for a broken random source", () => {
    expect(pickSegmentIndex(() => Number.NaN)).toBe(0);
    expect(pickSegmentIndex(() => 1)).toBe(0);
  });
});
