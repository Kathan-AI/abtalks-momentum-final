/**
 * Live, date-driven challenge clock.
 *
 * The ONLY fixed value in the whole product is the join date. Everything else
 * (current day, unlocks, streak, missed days) is computed from the real system
 * date at load time, so the app self-advances every calendar day.
 */

export const JOINED_ON = "2026-07-28";
export const TOTAL_DAYS = 60;

const MS_PER_DAY = 86_400_000;

/** Local calendar midnight for a Y-M-D string or Date. */
function startOfDay(value: string | Date): Date {
  if (typeof value === "string") {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y!, (m ?? 1) - 1, d ?? 1);
  }
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

/** Whole calendar days between joinedOn and today (0 on the join date). */
export function daysElapsedSince(joinedOn: string = JOINED_ON, today: Date = new Date()): number {
  const diff = startOfDay(today).getTime() - startOfDay(joinedOn).getTime();
  return Math.max(0, Math.round(diff / MS_PER_DAY));
}

/** currentDay = min(60, daysElapsed + 1) — advances automatically each day. */
export function computeCurrentDay(joinedOn: string = JOINED_ON, today: Date = new Date()): number {
  return Math.min(TOTAL_DAYS, daysElapsedSince(joinedOn, today) + 1);
}

/** "July 28, 2026" */
export function formatJoinedOn(joinedOn: string = JOINED_ON): string {
  return startOfDay(joinedOn).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export type ComputedStatus = "submitted" | "missed" | "pending" | "locked";

/**
 * Status depends ONLY on the calendar and whether a submission exists.
 * A missed day never locks or blocks a later day.
 */
export function computeDayStatus(day: number, currentDay: number, hasSubmission: boolean): ComputedStatus {
  if (day > currentDay) return "locked";
  if (hasSubmission) return "submitted";
  return day === currentDay ? "pending" : "missed";
}
