import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock, Sparkles, Target, ListChecks, PartyPopper } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Panel, SectionLabel } from "@/components/Panel";
import { ProofStatus } from "@/components/ProofStatus";
import { ProgressBar } from "@/components/ProgressBar";
import { FocusTimer } from "@/components/FocusTimer";
import { useMomentum, saveSubmission, clearSubmission } from "@/lib/momentum-store";
import type { Submission } from "@/data/cohort";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/day/$day")({
  head: () => ({
    meta: [
      { title: "Today's build — ABTalks Momentum" },
      {
        name: "description",
        content: "Read the day's brief, learning objective and acceptance criteria, then submit your proof of work.",
      },
      { property: "og:title", content: "Today's build — ABTalks Momentum" },
      { property: "og:description", content: "Build, commit, share and log your proof for the day." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DayPage,
});

const FIELDS = [
  { key: "githubRepoUrl", label: "GitHub repository URL", placeholder: "https://github.com/you/abtalks-day-12", required: true },
  { key: "githubCommitUrl", label: "GitHub commit URL", placeholder: "https://github.com/you/abtalks-day-12/commit/…", required: true },
  { key: "linkedinPostUrl", label: "LinkedIn post URL", placeholder: "https://linkedin.com/posts/…", required: true },
  { key: "liveDeploymentUrl", label: "Live deployment URL", placeholder: "https://abtalks-day-12.vercel.app", required: true },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];
type FormState = Record<FieldKey, string>;

const EMPTY: FormState = {
  githubRepoUrl: "",
  githubCommitUrl: "",
  linkedinPostUrl: "",
  liveDeploymentUrl: "",
};

function isUrl(value: string) {
  try {
    const u = new URL(value.trim());
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname.includes(".");
  } catch {
    return false;
  }
}

function DayPage() {
  const { day: dayParam } = Route.useParams();
  const navigate = useNavigate();
  const { days, student } = useMomentum();
  const dayNumber = Number(dayParam);
  const day = days.find((d) => d.day === dayNumber);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const submitted = day?.status === "submitted" && day.submission;

  useEffect(() => {
    setForm(EMPTY);
    setErrors({});
    setTouched(false);
    setJustSubmitted(false);
  }, [dayNumber]);

  const validate = useMemo(
    () => (values: FormState) => {
      const next: Partial<Record<FieldKey, string>> = {};
      for (const f of FIELDS) {
        const v = values[f.key].trim();
        if (!v) next[f.key] = "This field can't be empty.";
        else if (!isUrl(v)) next[f.key] = "Enter a full URL starting with https://";
      }
      return next;
    },
    [],
  );

  if (!day) {
    return (
      <AppShell>
        <Panel className="mt-10 p-6 text-center">
          <h1 className="text-xl">Day not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">Day {dayParam} isn't part of this 60-day challenge.</p>
          <Button className="mt-5" size="lg" variant="primary" asChild>
            <Link to="/dashboard">Back to dashboard</Link>
          </Button>
        </Panel>
      </AppShell>
    );
  }

  const locked = day.status === "locked";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const submission: Submission = {
      githubRepoUrl: form.githubRepoUrl.trim(),
      githubCommitUrl: form.githubCommitUrl.trim(),
      linkedinPostUrl: form.linkedinPostUrl.trim(),
      liveDeploymentUrl: form.liveDeploymentUrl.trim(),
      submittedAt: new Date().toISOString(),
    };
    saveSubmission(day.day, submission);
    setJustSubmitted(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppShell>
      {/* Top bar */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <Link
          to="/dashboard"
          aria-label="Back to dashboard"
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-white/[0.04] transition-colors hover:bg-white/[0.09] active:scale-95"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="min-w-0">
          <p className="mono-label text-muted-foreground">
            Day {day.day} of {student.totalDays}
          </p>
          <ProgressBar value={Math.round((day.day / 60) * 100)} className="mt-1.5" height="h-1.5" />
        </div>
      </div>

      {/* Success banner */}
      {justSubmitted ? (
        <Panel className="animate-pop-in relative mt-6 overflow-hidden border-momentum/35 bg-momentum/10 p-5 text-center">
          <span className="pointer-events-none absolute inset-x-0 top-6 flex justify-center gap-6" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="animate-spark size-1.5 rounded-full bg-momentum"
                style={{ animationDelay: `${i * 90}ms` }}
              />
            ))}
          </span>
          <span className="glow-momentum mx-auto grid size-14 place-items-center rounded-2xl bg-momentum/18 text-momentum">
            <PartyPopper className="size-7" />
          </span>
          <h2 className="mt-3 text-2xl">Day {day.day} logged</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Proof saved on this device. Your Momentum Score just moved — go see it.
          </p>
          <Button className="mt-4" size="lg" variant="momentum" onClick={() => navigate({ to: "/dashboard" })}>
            Back to dashboard
          </Button>
        </Panel>
      ) : null}

      {/* Brief */}
      <Panel className="mt-4 p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h1 className="min-w-0 text-2xl leading-tight">{day.title}</h1>
          <span className="mono-label flex shrink-0 items-center gap-1 rounded-full border border-border bg-white/[0.04] px-2.5 py-1.5 text-momentum">
            <Clock className="size-3" /> {day.estimatedTimeMinutes}m
          </span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{day.description}</p>
      </Panel>

      <Panel className="mt-4 p-5">
        <SectionLabel className="flex items-center gap-2 text-primary">
          <Target className="size-3.5" /> Learning objective
        </SectionLabel>
        <p className="mt-2 text-[15px] leading-relaxed">{day.learningObjective}</p>
      </Panel>

      <Panel className="mt-4 p-5">
        <SectionLabel className="flex items-center gap-2">
          <ListChecks className="size-3.5" /> Acceptance criteria
        </SectionLabel>
        <ul className="mt-3 space-y-2.5">
          {day.acceptanceCriteria.map((c) => (
            <li key={c} className="flex gap-2.5 text-sm leading-relaxed">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-momentum" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Panel>

      {!submitted && !locked ? <FocusTimer estimatedMinutes={day.estimatedTimeMinutes} /> : null}

      {/* Proof */}
      <section className="mt-8">
        <SectionLabel>Proof of work</SectionLabel>
        {submitted ? (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-momentum/30 bg-momentum/10 px-4 py-3">
              <CheckCircle2 className="size-5 shrink-0 text-momentum" />
              <div className="min-w-0">
                <p className="font-display font-bold text-momentum">Proof submitted</p>
                <p className="truncate text-xs text-muted-foreground">
                  {new Date(day.submission!.submittedAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <ProofStatus submission={day.submission} />
            <Button
              variant="ghost"
              size="md"
              className="w-full"
              onClick={() => {
                clearSubmission(day.day);
                setJustSubmitted(false);
                setForm(EMPTY);
              }}
            >
              Edit / resubmit proof
            </Button>
          </div>
        ) : locked ? (
          <Panel className="mt-3 p-5 text-center">
            <p className="font-display font-bold">This day unlocks later</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Day {day.day} opens once you reach it. Focus on Day {student.currentDay} tonight.
            </p>
            <Button className="mt-4" size="lg" variant="primary" asChild>
              <Link to="/day/$day" params={{ day: String(student.currentDay) }}>
                Go to Day {student.currentDay}
              </Link>
            </Button>
          </Panel>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-3 space-y-4">
            {touched && Object.keys(errors).length > 0 ? (
              <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive-foreground">
                {Object.keys(errors).length} field
                {Object.keys(errors).length > 1 ? "s need" : " needs"} a valid link before you can submit.
              </p>
            ) : null}

            {FIELDS.map((f) => (
              <div key={f.key}>
                <label htmlFor={f.key} className="mb-1.5 block text-sm font-semibold">
                  {f.label}
                </label>
                <input
                  id={f.key}
                  name={f.key}
                  type="url"
                  inputMode="url"
                  autoComplete="off"
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm((prev) => {
                      const next = { ...prev, [f.key]: value };
                      if (touched) setErrors(validate(next));
                      return next;
                    });
                  }}
                  aria-invalid={Boolean(errors[f.key])}
                  className={cn(
                    "min-h-[52px] w-full rounded-xl border bg-white/[0.03] px-3.5 text-[15px] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/70",
                    errors[f.key] && touched ? "border-destructive/60" : "border-input",
                  )}
                />
                {touched && errors[f.key] ? (
                  <p className="mt-1.5 text-xs text-destructive">{errors[f.key]}</p>
                ) : null}
              </div>
            ))}

            <div className="rounded-xl border border-border bg-white/[0.03] p-3">
              <p className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                <Sparkles className="size-3.5 shrink-0 text-momentum" />
                Submitting tonight keeps your streak at {student.currentStreak + 1} and lifts your Momentum Score.
              </p>
            </div>

            <Button type="submit" size="lg" variant="momentum">
              Submit proof for Day {day.day}
            </Button>
          </form>
        )}
      </section>

      <div className="mt-6">
        <Button variant="outline" size="lg" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="size-4" /> Back to dashboard
          </Link>
        </Button>
      </div>
    </AppShell>
  );
}
