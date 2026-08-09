import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Clock,
  Flame,
  Heart,
  Share2,
  Sparkles,
  Trophy,
  Github,
  Linkedin,
  CalendarPlus,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Panel, SectionLabel } from "@/components/Panel";
import { MomentumRing } from "@/components/MomentumRing";
import { ProgressBar } from "@/components/ProgressBar";
import { ProofStatus } from "@/components/ProofStatus";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { AchievementGrid } from "@/components/AchievementGrid";
import { ScenarioSwitcher } from "@/components/ScenarioSwitcher";
import { useMomentum } from "@/lib/momentum-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Momentum Dashboard — ABTalks Momentum" },
      {
        name: "description",
        content: "Track your Momentum Score, current streak, today's build and your GitHub + LinkedIn proof of work.",
      },
      { property: "og:title", content: "Your Momentum Dashboard — ABTalks Momentum" },
      { property: "og:description", content: "Momentum Score, today's build, and proof of work in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const {
    student,
    today,
    activity,
    achievements,
    progressPct,
    missedDaysList,
    lastMissedDay,
    isComplete,
    isEmpty,
    scenario,
    days,
    joinedOnLabel,
    forecast,
  } = useMomentum();
  const [showStates, setShowStates] = useState(false);

  const greeting = new Date().getHours() >= 20 ? "Late night grind" : "Welcome back";
  const recovered = lastMissedDay !== null && student.currentStreak > 0;

  return (
    <AppShell>
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="mono-label text-muted-foreground">{greeting}</p>
          <h1 className="mt-1 truncate text-3xl">{student.name}</h1>
          <p className="mt-1 truncate text-sm text-muted-foreground">{student.track}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground/80">Joined {joinedOnLabel}</p>
        </div>
        <span className="pulse-ring grid size-12 shrink-0 place-items-center rounded-full border border-momentum/30 bg-momentum/15 font-display text-lg font-bold text-momentum">
          {student.name.charAt(0)}
        </span>
      </header>

      {isComplete ? (
        <CompleteState
          name={student.name}
          longestStreak={student.longestStreak}
          momentum={student.momentumScore}
          totalMinutes={days.reduce((s, d) => s + (d.status === "submitted" ? d.estimatedTimeMinutes : 0), 0)}
        />
      ) : (
        <>
          {/* Momentum hero */}
          <Panel className="animate-rise-in mt-6 p-5">
            <div className="flex items-center gap-4">
              <MomentumRing score={student.momentumScore} streak={student.currentStreak} size={124} />
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <p className="mono-label text-muted-foreground">Progress</p>
                  <p className="font-display text-xl font-bold">
                    Day {student.currentDay} <span className="text-muted-foreground">of 60</span>
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">{student.completedDays} builds shipped</span>
                    <span className="text-xs font-bold text-momentum">{progressPct}%</span>
                  </div>
                  <ProgressBar value={progressPct} className="mt-1.5" />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Stat Icon={Flame} value={`${student.currentStreak}d`} label="Streak" />
              <Stat Icon={Trophy} value={`${student.longestStreak}d`} label="Best" />
              <Stat Icon={Heart} value={`${student.missedDays}`} label="Recovered" />
            </div>

            {forecast ? (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-3.5 py-2.5">
                <TrendingUp className={cn("size-4 shrink-0", forecast.onPace ? "text-momentum" : "text-primary")} />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  At this pace, on track to finish around{" "}
                  <span className="font-semibold text-foreground">{forecast.projectedDate}</span>.
                </p>
              </div>
            ) : null}
          </Panel>

          {/* Recovery card */}
          {isEmpty ? (
            <Panel className="mt-4 border-primary/30 bg-primary/8 p-5">
              <SectionLabel className="text-primary">Start here</SectionLabel>
              <h2 className="mt-2 text-xl">Your challenge hasn't started yet</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                No pressure and nothing to catch up on. Day 1 takes about 75 minutes — start whenever tonight works for
                you.
              </p>
              <Button className="mt-4" size="lg" variant="primary" asChild>
                <Link to="/day/$day" params={{ day: "1" }}>
                  <CalendarPlus className="size-4" /> Begin Day 1
                </Link>
              </Button>
            </Panel>
          ) : lastMissedDay !== null ? (
            <Panel className="mt-4 border-momentum/25 bg-momentum/[0.07] p-5">
              <SectionLabel className="flex items-center gap-2 text-momentum">
                <Sparkles className="size-3.5" /> Momentum recovery
              </SectionLabel>
              <h2 className="mt-2 text-xl">
                {missedDaysList.length === 1
                  ? `You missed Day ${missedDaysList[0]}. Your journey is not over.`
                  : `You missed ${missedDaysList.length} days (${missedDaysList.slice(-3).join(", ")}${
                      missedDaysList.length > 3 ? " and earlier" : ""
                    }). Your journey is not over.`}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {recovered
                  ? `You already came back — that recovery added ${12} points to your Momentum Score and unlocked Comeback Kid. Keep tonight small and keep it moving.`
                  : "Resume today with one small build. A recovery day is worth more momentum than an ordinary one."}
              </p>
              <div className="mt-4 rounded-xl border border-border bg-white/[0.03] p-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Day {student.currentDay} is open regardless — a missed day never locks a later one. Skipped days stay
                  skipped; you never have to “make up” old work. Only tonight matters.
                </p>
              </div>
            </Panel>
          ) : null}

          {/* Today's task */}
          {today ? (
            <Panel className="mt-4 p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <SectionLabel>Today · Day {today.day}</SectionLabel>
                  <h2 className="mt-2 text-xl leading-tight">{today.title}</h2>
                </div>
                <span className="mono-label flex shrink-0 items-center gap-1 rounded-full border border-border bg-white/[0.04] px-2.5 py-1.5 text-momentum">
                  <Clock className="size-3" /> {today.estimatedTimeMinutes}m
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{today.shortDescription}</p>
              <Button className="mt-4" size="lg" variant="momentum" asChild>
                <Link to="/day/$day" params={{ day: String(today.day) }}>
                  {today.status === "submitted" ? "Review today's proof" : "Continue today's task"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Panel>
          ) : null}

          {/* Proof status */}
          <section className="mt-8">
            <SectionLabel>Proof of work · Day {student.currentDay}</SectionLabel>
            <div className="mt-3">
              <ProofStatus submission={today?.submission ?? null} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={`https://github.com/${student.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-border bg-white/[0.03] text-sm font-semibold transition-colors hover:bg-white/[0.07]"
              >
                <Github className="size-4" /> @{student.githubUsername}
              </a>
              <a
                href={`https://linkedin.com/in/${student.linkedinHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-border bg-white/[0.03] text-sm font-semibold transition-colors hover:bg-white/[0.07]"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
            </div>
          </section>

          {/* Achievements */}
          <section className="mt-8">
            <SectionLabel>Achievements</SectionLabel>
            <div className="mt-3">
              <AchievementGrid items={achievements} currentDay={student.currentDay} />
            </div>
          </section>

          {/* Activity */}
          <section className="mt-8">
            <SectionLabel>Recent activity</SectionLabel>
            <div className="mt-4">
              <ActivityTimeline items={activity} />
            </div>
          </section>
        </>
      )}

      {/* Evaluator state preview */}
      <section className="mt-8">
        <button
          type="button"
          onClick={() => setShowStates((v) => !v)}
          className="mono-label min-h-[48px] w-full rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:bg-white/[0.04]"
        >
          {showStates ? "Hide state preview" : "Preview other states"}
        </button>
        {showStates ? (
          <div className="animate-rise-in mt-3">
            <ScenarioSwitcher active={scenario} />
          </div>
        ) : null}
      </section>
    </AppShell>
  );
}

function Stat({ Icon, value, label }: { Icon: typeof Flame; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-white/[0.03] px-2 py-2.5 text-center">
      <Icon className="mx-auto size-4 text-momentum" />
      <p className="mt-1 font-display text-base font-bold">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function CompleteState({
  name,
  longestStreak,
  momentum,
  totalMinutes,
}: {
  name: string;
  longestStreak: number;
  momentum: number;
  totalMinutes: number;
}) {
  const [copied, setCopied] = useState(false);
  const hours = Math.round(totalMinutes / 60);

  const share = async () => {
    const text = `I completed the ABTalks 60-day build challenge — 60 builds, ${hours}+ hours, Momentum Score ${momentum}. #ABTalks`;
    try {
      if (navigator.share) await navigator.share({ text, title: "ABTalks Momentum" });
      else await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <Panel className="animate-pop-in relative overflow-hidden p-6 text-center">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative">
          <span className="glow-momentum mx-auto grid size-16 place-items-center rounded-2xl bg-momentum/15 text-momentum">
            <Trophy className="size-8" />
          </span>
          <p className="mono-label mt-4 text-momentum">Challenge complete</p>
          <h2 className="mt-2 text-3xl leading-tight">
            60 builds.
            <br />
            Done, {name}.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            You finished all 60 days — including the nights you nearly skipped and came back from. That recovery is part
            of the story now.
          </p>
        </div>
      </Panel>

      <Panel className="p-5">
        <SectionLabel>Portfolio summary</SectionLabel>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { v: "60", l: "Builds shipped" },
            { v: "60", l: "GitHub commits" },
            { v: "60", l: "LinkedIn posts" },
            { v: `${hours}h`, l: "Focused build time" },
            { v: `${longestStreak}d`, l: "Longest streak" },
            { v: `${momentum}`, l: "Final momentum" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-white/[0.03] p-3">
              <p className="font-display text-2xl font-bold text-momentum">{s.v}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <SectionLabel>Shareable badge</SectionLabel>
        <div className="mt-3 rounded-2xl border border-momentum/30 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--primary)_22%,transparent),color-mix(in_oklab,var(--momentum)_18%,transparent))] p-5 text-center">
          <p className="mono-label text-momentum">ABTalks · 2026 Cohort</p>
          <p className="mt-2 font-display text-2xl font-bold tracking-tight">{name} finished 60/60</p>
          <p className="mt-1 text-xs text-muted-foreground">Momentum Score {momentum} · Full Stack Development</p>
        </div>
        <Button className="mt-4" size="lg" variant="momentum" onClick={share}>
          <Share2 className="size-4" /> {copied ? "Copied to clipboard" : "Share my badge"}
        </Button>
      </Panel>
    </div>
  );
}
