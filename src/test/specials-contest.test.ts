import { describe, expect, it } from "vitest";
import { contestEntriesOpen, specialsContest } from "../lib/specials-contest";

describe("free body-work contest", () => {
  it("offers a free 60-minute session", () => {
    expect(specialsContest.durationMinutes).toBe(60);
    expect(specialsContest.price).toBe(0);
  });
  it("limits the contest to ten entries", () => {
    expect(specialsContest.maxEntries).toBe(10);
  });
  it("requires an existing customer", () => {
    expect(specialsContest.existingCustomerRequired).toBe(true);
  });
  it("requires good standing", () => {
    expect(specialsContest.goodStandingRequired).toBe(true);
  });
  it("closes Friday October 16 at 8 PM New York time", () => {
    expect(specialsContest.timeZone).toBe("America/New_York");
    expect(new Date(specialsContest.closesAt).toISOString()).toBe("2026-10-17T00:00:00.000Z");
    expect(contestEntriesOpen(new Date("2026-10-16T23:59:59Z"))).toBe(true);
    expect(contestEntriesOpen(new Date("2026-10-17T00:00:00Z"))).toBe(false);
  });
  it("draws Saturday October 17 at 8 AM New York time", () => {
    expect(new Date(specialsContest.drawingAt).toISOString()).toBe("2026-10-17T12:00:00.000Z");
  });
  it("assigns a number for the wheel", () => {
    expect(specialsContest.assignedWheelNumber).toBe(true);
  });
  it("sends the viewing link after the drawing", () => {
    expect(specialsContest.viewingLinkAfterDrawing).toBe(true);
  });
});