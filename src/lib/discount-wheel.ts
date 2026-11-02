export interface WheelSegment {
  kind: "prize" | "blank";
  label: string;
  minutes?: number;
  code?: string;
}

export const SEGMENT_COUNT = 8;

/**
 * The wheel is built from this list, in order, clockwise from the top.
 * Two of each prize, alternating with four blank sections.
 */
export const SEGMENTS: readonly WheelSegment[] = [
  { kind: "prize", minutes: 60, code: "ad1060", label: "10% OFF\n60 MIN" },
  { kind: "blank", label: "" },
  { kind: "prize", minutes: 75, code: "ad7510", label: "10% OFF\n75 MIN" },
  { kind: "blank", label: "" },
  { kind: "prize", minutes: 60, code: "ad1060", label: "10% OFF\n60 MIN" },
  { kind: "blank", label: "" },
  { kind: "prize", minutes: 75, code: "ad7510", label: "10% OFF\n75 MIN" },
  { kind: "blank", label: "" },
];

/** A visitor waits 12 hours between spins. */
export const SPIN_COOLDOWN_MS = 12 * 60 * 60 * 1000;

/** How long the wheel takes to come to rest. */
export const SPIN_DURATION_MS = 4200;

/** Shown when the wheel stops on a blank section. */
export const BLANK_RESULT_MESSAGE = "No luck this time — try again tomorrow.";

/** Where a visitor's spin is remembered on their own device. */
export const STORAGE_KEY = "ew_discount_wheel";

const TIME_ZONE = "America/New_York";

function zoneOffsetMs(instantMs: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(instantMs));

  const value: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") value[part.type] = part.value;
  }

  const asUtc = Date.UTC(
    Number(value.year),
    Number(value.month) - 1,
    Number(value.day),
    Number(value.hour) % 24,
    Number(value.minute),
    Number(value.second),
  );
  return asUtc - instantMs;
}

/** Turn a clock time in the therapist's own time zone into a timestamp. */
export function easternTime(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second = 0,
): number {
  const guess = Date.UTC(year, month - 1, day, hour, minute, second);
  return guess - zoneOffsetMs(guess);
}

/** The wheel runs this week only: Monday Nov 2 through Sunday Nov 8, 11:59 PM Eastern. */
export const WHEEL_START_MS = easternTime(2026, 11, 2, 0, 0, 0);
export const WHEEL_END_MS = easternTime(2026, 11, 8, 23, 59, 59);

export function isWheelLive(now: number = Date.now()): boolean {
  return now >= WHEEL_START_MS && now <= WHEEL_END_MS;
}

export function canSpin(lastSpinAt: number | null | undefined, now: number = Date.now()): boolean {
  if (lastSpinAt == null) return true;
  return now - lastSpinAt >= SPIN_COOLDOWN_MS;
}

export function nextSpinAt(lastSpinAt: number): number {
  return lastSpinAt + SPIN_COOLDOWN_MS;
}

export function formatCountdown(msLeft: number): string {
  if (msLeft <= 0) return "any minute now";
  const totalMinutes = Math.floor(msLeft / 60000);
  if (totalMinutes < 1) return "less than a minute";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours < 1) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  return `${hours} hour${hours === 1 ? "" : "s"} ${minutes} minute${minutes === 1 ? "" : "s"}`;
}

/** Pick the section the wheel stops on; every section is equally likely. */
export function pickSegmentIndex(random: () => number = Math.random): number {
  const value = random();
  if (!(value >= 0 && value < 1)) return 0;
  return Math.min(SEGMENT_COUNT - 1, Math.floor(value * SEGMENT_COUNT));
}

export function resultMessage(segment: WheelSegment): string {
  if (segment.kind === "blank") return BLANK_RESULT_MESSAGE;
  return `You won 10% off a ${segment.minutes}-minute session!`;
}
