import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Linkedin, Flame, Trophy, CalendarDays, RotateCcw, ClipboardCopy, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel, SectionLabel } from "@/components/Panel";
import { Button } from "@/components/Button";
import { MomentumRing } from "@/components/MomentumRing";
import { ScenarioSwitcher } from "@/components/ScenarioSwitcher";
import { useMomentum, setScenario } from "@/lib/momentum-store";
import type { ChallengeDay, Student } from "@/data/cohort";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — ABTalks Momentum" },
      { name: "description", content: "Your track, streak history, connected GitHub and LinkedIn proof accounts." },
      { property: "og:title", content: "Profile — ABTalks Momentum" },
      { property: "og:description", content: "Track, streaks and proof accounts for your 60-day challenge." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function buildPortfolioText(student: Student, days: ChallengeDay[]): string {
  const shipped = days.filter((d) => d.status === "submitted" && d.submission);
  const header = [
    `${student.name} — ABTalks Momentum`,
    `${student.track} · ${shipped.length}/${student.totalDays} builds shipped · Momentum Score ${student.momentumScore}`,
    "",
  ];
  const body = shipped.flatMap((d) => {
    const s = d.submission!;
    const lines = [`Day ${d.day} — ${d.title}`, `  GitHub:   ${s.githubCommitUrl}`, `  LinkedIn: ${s.linkedinPostUrl}`];
    if (s.liveDeploymentUrl) lines.push(`  Live:     ${s.liveDeploymentUrl}`);
    lines.push("");
    return lines;
  });
  return [...header, ...body].join("\n").trim();
}

function ProfilePage() {
  const { student, days, isEmpty, scenario, joinedOnLabel } = useMomentum();
  const joined = joinedOnLabel;
  const [copied, setCopied] = useState(false);
  const shippedCount = days.filter((d) => d.status === "submitted" && d.submission).length;

  const copyPortfolio = async () => {
    const text = buildPortfolioText(student, days);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AppShell>
      <header className="flex items-center gap-4">
        <span className="pulse-ring grid size-16 shrink-0 place-items-center rounded-full border border-momentum/30 bg-momentum/15 font-display text-2xl font-bold text-momentum">
          {student.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-3xl">{student.name}</h1>
          <p className="truncate text-sm text-muted-foreground">{student.track}</p>
        </div>
      </header>

      <Panel className="mt-6 flex flex-col items-center p-5">
        <MomentumRing score={student.momentumScore} streak={student.currentStreak} size={148} />
        {isEmpty ? (
          <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
            Nothing here yet — your Momentum Score starts building the night you ship Day 1.
          </p>
        ) : (
          <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
            Momentum blends consistency with recovery, so one missed night never wipes out your work.
          </p>
        )}
      </Panel>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { Icon: Flame, v: `${student.currentStreak}d`, l: "Current" },
          { Icon: Trophy, v: `${student.longestStreak}d`, l: "Longest" },
          { Icon: CalendarDays, v: `${student.completedDays}`, l: "Builds" },
        ].map(({ Icon, v, l }) => (
          <div key={l} className="rounded-xl border border-border bg-white/[0.03] px-2 py-3 text-center">
            <Icon className="mx-auto size-4 text-momentum" />
            <p className="mt-1 font-display text-lg font-bold">{v}</p>
            <p className="text-[11px] text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <section className="mt-8">
        <SectionLabel>Proof accounts</SectionLabel>
        <div className="mt-3 space-y-2">
          <a
            href={`https://github.com/${student.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[56px] items-center gap-3 rounded-xl border border-border bg-white/[0.03] px-4 transition-colors hover:bg-white/[0.07]"
          >
            <Github className="size-5 shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">GitHub</span>
              <span className="block truncate text-xs text-muted-foreground">@{student.githubUsername}</span>
            </span>
          </a>
          <a
            href={`https://linkedin.com/in/${student.linkedinHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[56px] items-center gap-3 rounded-xl border border-border bg-white/[0.03] px-4 transition-colors hover:bg-white/[0.07]"
          >
            <Linkedin className="size-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">LinkedIn</span>
              <span className="block truncate text-xs text-muted-foreground">/in/{student.linkedinHandle}</span>
            </span>
          </a>
        </div>
      </section>

      <section className="mt-8">
        <SectionLabel>Portfolio export</SectionLabel>
        <Panel className="mt-3 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {shippedCount > 0
              ? `Copy every GitHub commit and LinkedIn post from your ${shippedCount} shipped days as one plain-text block — ready to paste into a resume, a portfolio page, or a placement-cell form.`
              : "Ship your first day to unlock a copyable portfolio of your proof links."}
          </p>
          <Button className="mt-3.5 w-full" variant="outline" size="md" disabled={shippedCount === 0} onClick={copyPortfolio}>
            {copied ? (
              <>
                <Check className="size-4 text-momentum" /> Copied to clipboard
              </>
            ) : (
              <>
                <ClipboardCopy className="size-4" /> Copy my portfolio
              </>
            )}
          </Button>
        </Panel>
      </section>

      <section className="mt-8">
        <SectionLabel>Challenge</SectionLabel>
        <Panel className="mt-3 p-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Joined</span>
            <span className="font-semibold">{joined}</span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Recovered days</span>
            <span className="font-semibold">{student.missedDays}</span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Current day</span>
            <span className="font-semibold">
              {student.currentDay} / {student.totalDays}
            </span>
          </div>
        </Panel>
      </section>

      <section className="mt-8">
        <ScenarioSwitcher active={scenario} />
        <Button
          className="mt-3 w-full"
          variant="ghost"
          size="md"
          onClick={() => {
            try {
              window.localStorage.removeItem("abtalks:submissions:v1");
            } catch {
              /* noop */
            }
            setScenario("current");
            window.location.reload();
          }}
        >
          <RotateCcw className="size-4" /> Reset saved submissions
        </Button>
      </section>

      <div className="mt-6">
        <Button variant="outline" size="lg" asChild>
          <Link to="/">About ABTalks Momentum</Link>
        </Button>
      </div>
    </AppShell>
  );
}
