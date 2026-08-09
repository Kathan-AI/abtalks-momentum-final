import { useCallback, useMemo, useSyncExternalStore } from "react";
import { JOINED_ON, computeCurrentDay, computeDayStatus, formatJoinedOn } from "@/lib/challenge-date";
import {
  achievements as baseAchievements,
  activity as baseActivity,
  days as baseDays,
  student as baseStudent,
  type Achievement,
  type ActivityItem,
  type ChallengeDay,
  type Student,
  type Submission,
} from "@/data/cohort";

/* ------------------------------------------------------------------ */
/* Scenarios: evaluators can preview edge states without editing data. */
/* ------------------------------------------------------------------ */

export type Scenario = "current" | "firstDay" | "complete" | "empty";

export const SCENARIOS: { id: Scenario; label: string; hint: string }[] = [
  { id: "current", label: "Day 12 · active", hint: "11-day streak, one missed day being recovered" },
  { id: "firstDay", label: "Day 1 · fresh start", hint: "Streak 0, Momentum 0, nothing submitted yet" },
  { id: "complete", label: "Day 60 · complete", hint: "All 60 builds shipped, portfolio ready" },
  { id: "empty", label: "Empty profile", hint: "Account created, challenge not started" },
];

const SUB_KEY = "abtalks:submissions:v1";
const SCENARIO_KEY = "abtalks:scenario:v1";

type SubmissionMap = Record<string, Submission>;

interface StoreState {
  submissions: SubmissionMap;
  scenario: Scenario;
}

let state: StoreState = { submissions: {}, scenario: "current" };
let hydrated = false;
const listeners = new Set<() => void>();

function readLocal(): StoreState {
  if (typeof window === "undefined") return { submissions: {}, scenario: "current" };
  let submissions: SubmissionMap = {};
  let scenario: Scenario = "current";
  try {
    const raw = window.localStorage.getItem(SUB_KEY);
    if (raw) submissions = JSON.parse(raw) as SubmissionMap;
  } catch {
    submissions = {};
  }
  try {
    const s = window.localStorage.getItem(SCENARIO_KEY);
    if (s && SCENARIOS.some((x) => x.id === s)) scenario = s as Scenario;
  } catch {
    scenario = "current";
  }
  return { submissions, scenario };
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  if (!hydrated) {
    hydrated = true;
    state = readLocal();
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const serverSnapshot: StoreState = { submissions: {}, scenario: "current" };
const getSnapshot = () => state;
const getServerSnapshot = () => serverSnapshot;

export function saveSubmission(day: number, submission: Submission) {
  const submissions = { ...state.submissions, [String(day)]: submission };
  state = { ...state, submissions };
  try {
    window.localStorage.setItem(SUB_KEY, JSON.stringify(submissions));
  } catch {
    /* storage unavailable — keep in-memory */
  }
  emit();
}

export function clearSubmission(day: number) {
  const submissions = { ...state.submissions };
  delete submissions[String(day)];
  state = { ...state, submissions };
  try {
    window.localStorage.setItem(SUB_KEY, JSON.stringify(submissions));
  } catch {
    /* noop */
  }
  emit();
}

export function setScenario(scenario: Scenario) {
  state = { ...state, scenario };
  try {
    window.localStorage.setItem(SCENARIO_KEY, scenario);
  } catch {
    /* noop */
  }
  emit();
}

/* ------------------------------------------------------------------ */
/* Momentum: rewards consistency AND recovery.                         */
/* ------------------------------------------------------------------ */

export function computeMomentum(days: ChallengeDay[], currentDay: number): number {
  const elapsed = days.filter((d) => d.day < currentDay);
  if (elapsed.length === 0) return 0;

  let score = 0;
  let run = 0;
  let recoveries = 0;
  let previousMissed = false;

  for (const d of elapsed) {
    if (d.status === "submitted") {
      run += 1;
      // base credit + consistency bonus that caps out, so streaks compound gently
      score += 10 + Math.min(run, 5);
      if (previousMissed) {
        // recovery is worth MORE than an ordinary day: coming back is the skill
        score += 12;
        recoveries += 1;
      }
      previousMissed = false;
    } else if (d.status === "missed") {
      // a miss dents momentum, it never zeroes it
      score -= 6;
      run = 0;
      previousMissed = true;
    }
  }

  const max = elapsed.length * 15;
  const pct = Math.round((Math.max(score, 0) / Math.max(max, 1)) * 100);
  return Math.max(0, Math.min(100, pct + Math.min(recoveries * 2, 8)));
}

/* ------------------------------------------------------------------ */
/* Forecast: a light, honest projection — not a promise.               */
/* ------------------------------------------------------------------ */

export interface Forecast {
  projectedDate: string | null; // formatted, e.g. "October 5, 2026"
  daysRemaining: number;
  onPace: boolean;
}

export function computeForecast(completedDays: number, currentDay: number, totalDays = 60): Forecast | null {
  const elapsed = currentDay - 1;
  if (completedDays === 0 || elapsed <= 0) return null;

  const rate = completedDays / elapsed; // builds per elapsed day
  if (rate <= 0) return null;

  const remainingBuilds = totalDays - completedDays;
  if (remainingBuilds <= 0) return null;

  const daysNeeded = Math.ceil(remainingBuilds / rate);
  const projected = new Date();
  projected.setDate(projected.getDate() + daysNeeded);

  return {
    projectedDate: projected.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
    daysRemaining: daysNeeded,
    onPace: rate >= 1,
  };
}

/* ------------------------------------------------------------------ */
/* Derived cohort view                                                  */
/* ------------------------------------------------------------------ */

export interface MomentumView {
  student: Student;
  days: ChallengeDay[];
  today: ChallengeDay | null;
  activity: ActivityItem[];
  achievements: Achievement[];
  progressPct: number;
  missedDaysList: number[];
  lastMissedDay: number | null;
  isComplete: boolean;
  isEmpty: boolean;
  scenario: Scenario;
  joinedOnLabel: string;
  forecast: Forecast | null;
}

function seededSubmission(day: number): Submission {
  return {
    githubRepoUrl: `https://github.com/${baseStudent.githubUsername}/abtalks-day-${day}`,
    githubCommitUrl: `https://github.com/${baseStudent.githubUsername}/abtalks-day-${day}/commit/a1b2c3d`,
    linkedinPostUrl: `https://linkedin.com/posts/${baseStudent.linkedinHandle}_day${day}-abtalks-activity`,
    liveDeploymentUrl: `https://abtalks-day-${day}.vercel.app`,
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Resolve the submission for a day, then derive status purely from the live
 * calendar. Completing or missing a day never affects any other day.
 */
function buildDays(scenario: Scenario, submissions: SubmissionMap, currentDay: number): ChallengeDay[] {
  return baseDays.map((d) => {
    const stored = submissions[String(d.day)] ?? null;
    let submission: Submission | null = stored;

    if (!submission) {
      if (scenario === "current") {
        // Seeded history from before this device (day 8 was genuinely missed).
        submission = d.submission ?? null;
      } else if (scenario === "complete" && d.day <= currentDay) {
        submission = d.submission ?? seededSubmission(d.day);
      }
    }

    if (d.day > currentDay) submission = null;

    return {
      ...d,
      submission,
      status: computeDayStatus(d.day, currentDay, submission !== null),
    };
  });
}

export function useMomentum(): MomentumView {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { scenario, submissions } = snapshot;

  return useMemo(() => {
    const currentDay =
      scenario === "firstDay" || scenario === "empty" ? 1 : scenario === "complete" ? 60 : computeCurrentDay();

    const days = buildDays(scenario, submissions, currentDay);
    const elapsed = days.filter((d) => d.day <= currentDay);
    const completedDays = elapsed.filter((d) => d.status === "submitted").length;
    const missedDaysList = elapsed.filter((d) => d.status === "missed").map((d) => d.day);
    const missedDays = missedDaysList.length;

    // Consecutive submitted days counting backward from currentDay - 1,
    // plus today itself when already submitted.
    let streak = 0;
    for (let i = currentDay - 1; i >= 1; i--) {
      if (days[i - 1]?.status === "submitted") streak += 1;
      else break;
    }
    if (days[currentDay - 1]?.status === "submitted") streak += 1;

    const isComplete = completedDays >= 60;
    const isEmpty = scenario === "empty" && completedDays === 0;

    const momentumScore = isEmpty ? 0 : computeMomentum(days, currentDay + (isComplete ? 1 : 0));

    let longestStreak = 0;
    let run = 0;
    for (const d of elapsed) {
      if (d.status === "submitted") {
        run += 1;
        longestStreak = Math.max(longestStreak, run);
      } else if (d.status === "missed") {
        run = 0;
      }
    }

    const student: Student = {
      ...baseStudent,
      joinedOn: JOINED_ON,
      currentDay,
      completedDays,
      missedDays,
      currentStreak: streak,
      longestStreak: Math.max(longestStreak, streak),
      momentumScore,
    };

    const lastMissedDay = missedDaysList.length ? missedDaysList[missedDaysList.length - 1]! : null;

    const storedActivity: ActivityItem[] = Object.entries(submissions)
      .map(([day, sub]) => ({
        day: Number(day),
        type: "submission" as const,
        message: `Submitted Day ${day}: ${baseDays[Number(day) - 1]?.title ?? ""}`,
        timestamp: sub.submittedAt,
      }))
      .sort((a, b) => b.day - a.day);

    const activity =
      isEmpty || scenario === "firstDay"
        ? storedActivity
        : [
            ...storedActivity,
            ...baseActivity.filter((a) => a.day <= currentDay && !storedActivity.some((s) => s.day === a.day)),
          ];

    const unlocked = new Set<string>();
    if (completedDays >= 1) unlocked.add("first-submission");
    if (student.longestStreak >= 7) unlocked.add("seven-day-streak");
    if (missedDays >= 1 && completedDays > missedDays) unlocked.add("comeback-kid");
    if (completedDays >= 30) unlocked.add("halfway-hero");
    if (isComplete) unlocked.add("portfolio-builder");

    const achievementList = baseAchievements.map((a) => ({
      ...a,
      unlocked: unlocked.has(a.id),
      unlockedOnDay: unlocked.has(a.id) ? (a.unlockedOnDay ?? currentDay) : null,
    }));

    return {
      student,
      days,
      today: days[currentDay - 1] ?? null,
      activity,
      achievements: achievementList,
      progressPct: Math.round((completedDays / 60) * 100),
      missedDaysList,
      lastMissedDay,
      isComplete,
      isEmpty,
      scenario,
      joinedOnLabel: formatJoinedOn(JOINED_ON),
      forecast: isComplete || isEmpty ? null : computeForecast(completedDays, currentDay),
    };
  }, [scenario, submissions]);
}

export function useSubmitDay() {
  return useCallback((day: number, submission: Submission) => saveSubmission(day, submission), []);
}

