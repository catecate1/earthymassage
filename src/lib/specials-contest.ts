export const specialsContest = {
  durationMinutes: 60,
  price: 0,
  maxEntries: 10,
  existingCustomerRequired: true,
  goodStandingRequired: true,
  closesAt: "2026-10-16T20:00:00-04:00",
  drawingAt: "2026-10-17T08:00:00-04:00",
  timeZone: "America/New_York",
  assignedWheelNumber: true,
  viewingLinkAfterDrawing: true,
} as const;

export const contestEntriesOpen = (now: Date) =>
  now.getTime() < new Date(specialsContest.closesAt).getTime();