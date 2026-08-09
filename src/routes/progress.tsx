import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, MinusCircle, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel, SectionLabel } from "@/components/Panel";
import { ProgressBar } from "@/components/ProgressBar";
import { AchievementGrid } from "@/components/AchievementGrid";
import { useMomentum } from "@/lib/momentum-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — ABTalks Momentum" },
      { name: "description", content: "See all 60 days at a glance: shipped builds, missed days and what's next." },
      { property: "og:title", content: "Progress — ABTalks Momentum" },
      { property: "og:description", content: "All 60 days of your build challenge in one grid." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgressPage,
});

const LEGEND = [
  { Icon: CheckCircle2, label: "Shipped", cls: "text-momentum" },
  { Icon: Circle, label: "Today", cls: "text-primary" },
  { Icon: MinusCircle, label: "Missed", cls: "text-warn" },
  { Icon: Lock, label: "Locked", cls: "text-muted-foreground" },
];

function ProgressPage() {
  const { days, student, progressPct, achievements } = useMomentum();

  return (
    <AppShell>
      <header>
        <p className="mono-label text-muted-foreground">Your 60 days</p>
        <h1 className="mt-1 text-3xl">Progress</h1>
      </header>

      <Panel className="mt-5 p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">{student.completedDays} of 60 shipped</span>
          <span className="font-display text-xl font-bold text-momentum">{progressPct}%</span>
        </div>
        <ProgressBar value={progressPct} className="mt-2" />
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {LEGEND.map(({ Icon, label, cls }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className={cn("size-3.5", cls)} /> {label}
            </span>
          ))}
        </div>
      </Panel>

      <section className="mt-6">
        <SectionLabel>Day grid</SectionLabel>
        <div className="mt-3 grid grid-cols-6 gap-2">
          {days.map((d) => {
            const isToday = d.day === student.currentDay;
            return (
              <Link
                key={d.day}
                to="/day/$day"
                params={{ day: String(d.day) }}
                aria-label={`Day ${d.day}: ${d.title}`}
                className={cn(
                  "grid aspect-square place-items-center rounded-full border font-display text-sm font-bold transition-transform active:scale-95",
                  d.status === "submitted" && "border-momentum/40 bg-momentum/15 text-momentum",
                  d.status === "missed" && "border-warn/40 bg-warn/10 text-warn",
                  isToday && "pulse-ring scale-110 border-momentum bg-momentum/25 text-foreground",
                  !isToday && "circle-quiet",
                  d.status === "locked" && !isToday && "border-border bg-white/[0.02] text-muted-foreground/70",
                  d.status === "pending" && !isToday && "border-border bg-white/[0.03]",
                )}
              >
                {d.day}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <SectionLabel>Achievements</SectionLabel>
        <div className="mt-3">
          <AchievementGrid items={achievements} currentDay={student.currentDay} />
        </div>
      </section>
    </AppShell>
  );
}
