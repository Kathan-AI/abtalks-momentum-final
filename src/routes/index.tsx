import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  GitCommitHorizontal,
  Github,
  Linkedin,
  Rocket,
  Terminal,
  Zap,
  ShieldCheck,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Panel, SectionLabel } from "@/components/Panel";
import { CountUp } from "@/components/CountUp";
import { BootSequence, useBootSequence } from "@/components/BootSequence";
import { ScrollReveal, useScrollReveal } from "@/components/ScrollReveal";
import { socialProof } from "@/data/cohort";
import { computeCurrentDay } from "@/lib/challenge-date";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABTalks Momentum — 60 days. 60 builds. A proven portfolio." },
      {
        name: "description",
        content:
          "A 60-day build challenge for Indian college students. Ship daily, commit to GitHub, share on LinkedIn, and grow a Momentum Score that rewards recovery, not just streaks.",
      },
      { property: "og:title", content: "ABTalks Momentum — 60 days. 60 builds." },
      {
        property: "og:description",
        content:
          "Build daily, prove it on GitHub and LinkedIn, and rebuild momentum after every missed day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const WORKFLOW = [
  {
    Icon: Terminal,
    title: "Build",
    body: "One focused build every night. 30–75 minutes, scoped so it fits around lectures and labs.",
  },
  {
    Icon: GitCommitHorizontal,
    title: "Commit",
    body: "Push real code. Every day adds a dated commit that recruiters can actually open.",
  },
  {
    Icon: Linkedin,
    title: "Share",
    body: "Post what you learned in your own words. Your network watches you get better in public.",
  },
  {
    Icon: Zap,
    title: "Continue",
    body: "Missed a night? Momentum bends, it doesn't break. Come back and it climbs faster.",
  },
];

const BENEFITS = [
  {
    Icon: ShieldCheck,
    title: "Proof over promises",
    body: "60 repos and 60 posts beat one line on a resume that says 'familiar with React'.",
  },
  {
    Icon: Clock,
    title: "Fits a college week",
    body: "Tasks are sized for late-night hours after class, practicals and society work.",
  },
  {
    Icon: Rocket,
    title: "Interview-ready stories",
    body: "Every build comes with an objective, so you can explain the 'why' in a placement round.",
  },
];

function WorkflowItem({
  Icon,
  title,
  body,
  index,
}: {
  Icon: (typeof WORKFLOW)[number]["Icon"];
  title: string;
  body: string;
  index: number;
}) {
  const reveal = useScrollReveal("rise", index * 90);
  return (
    <li
      ref={reveal.ref}
      className={cn("panel flex gap-3.5 p-4", reveal.className)}
      style={reveal.style}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-base font-bold">
          <span className="mono-label mr-2 text-muted-foreground">0{index + 1}</span>
          {title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

function BenefitItem({
  Icon,
  title,
  body,
  index,
}: {
  Icon: (typeof BENEFITS)[number]["Icon"];
  title: string;
  body: string;
  index: number;
}) {
  const reveal = useScrollReveal("rise", index * 90);
  return (
    <li
      ref={reveal.ref}
      className={cn("panel flex gap-3.5 p-4", reveal.className)}
      style={reveal.style}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-momentum/15 text-momentum">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="font-display font-bold">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

function Landing() {
  const { booting, ready, finish } = useBootSequence();
  const today = computeCurrentDay();

  if (booting) {
    return <BootSequence onDone={finish} />;
  }

  if (!ready) {
    // Avoid a flash of hero content before we've checked sessionStorage.
    return <div className="app-canvas min-h-screen w-full" />;
  }

  return (
    <div className="app-canvas animate-rise-in min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-md px-4 pt-8 pb-16">
        {/* Hero */}
        <header className="relative">
          <div
            className="grid-lines pointer-events-none absolute -inset-x-10 -top-16 h-72"
            aria-hidden
          />
          <div className="relative">
            <span className="mono-label inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-momentum">
              <span className="animate-momentum-pulse size-1.5 rounded-full bg-momentum" />
              ABTalks Momentum
            </span>

            <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-bold">
              60 days.
              <br />
              60 builds.
              <br />
              <span className="bg-[linear-gradient(100deg,var(--primary),var(--momentum))] bg-clip-text text-transparent">
                A portfolio you can prove.
              </span>
            </h1>

            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              A daily build challenge made for Indian college students. Ship something small every
              night, push the commit, share the lesson — and watch your Momentum Score grow, even
              after the days you miss.
            </p>

            <div className="mt-7 space-y-3">
              <Button size="lg" variant="momentum" asChild>
                <Link to="/dashboard">
                  Start my challenge <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/day/$day" params={{ day: String(today) }}>
                  Peek at today's build
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Momentum explainer */}
        <ScrollReveal variant="assemble">
          <Panel className="mt-10 p-5">
            <SectionLabel>Why Momentum, not streaks</SectionLabel>
            <p className="mt-3 text-[15px] leading-relaxed">
              A streak punishes you once and then keeps punishing you. Momentum Score rewards two
              things: <span className="font-semibold text-momentum">consistency</span> and{" "}
              <span className="font-semibold text-primary">recovery</span>. Miss Day 8 and your
              score dips — come back on Day 9 and it climbs harder than a normal day.
            </p>
          </Panel>
        </ScrollReveal>

        {/* Workflow */}
        <section className="mt-12">
          <SectionLabel>The nightly loop</SectionLabel>
          <h2 className="mt-2 text-2xl">Build · Commit · Share · Continue</h2>
          <ul className="mt-5 space-y-3">
            {WORKFLOW.map(({ Icon, title, body }, i) => (
              <WorkflowItem key={title} Icon={Icon} title={title} body={body} index={i} />
            ))}
          </ul>
        </section>

        {/* Proof of work */}
        <section className="mt-12">
          <SectionLabel>Proof of work</SectionLabel>
          <h2 className="mt-2 text-2xl">Two links a recruiter can open</h2>
          <div className="mt-5 grid gap-3">
            <ScrollReveal variant="slide-left">
              <Panel className="p-4">
                <span className="grid size-10 place-items-center rounded-xl bg-white/6">
                  <Github className="size-5" />
                </span>
                <p className="mt-3 font-display font-bold">GitHub commit trail</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Each day is a repo and a dated commit. Your contribution graph becomes an honest
                  record of 60 nights of work — not a screenshot of a certificate.
                </p>
              </Panel>
            </ScrollReveal>
            <ScrollReveal variant="slide-right" delay={100}>
              <Panel className="p-4">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Linkedin className="size-5" />
                </span>
                <p className="mt-3 font-display font-bold">LinkedIn learning log</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  A short post per build. By Day 60 your feed reads like a growth story, and hiring
                  managers in your city have already seen your name.
                </p>
              </Panel>
            </ScrollReveal>
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-12">
          <SectionLabel>Made for campus life</SectionLabel>
          <h2 className="mt-2 text-2xl">Built around your timetable</h2>
          <ul className="mt-5 space-y-3">
            {BENEFITS.map(({ Icon, title, body }, i) => (
              <BenefitItem key={title} Icon={Icon} title={title} body={body} index={i} />
            ))}
          </ul>
        </section>

        {/* Social proof */}
        <section className="mt-12">
          <ScrollReveal variant="assemble">
            <Panel className="p-5">
              <SectionLabel className="flex items-center gap-2">
                <Users className="size-3.5" /> This cohort so far
              </SectionLabel>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { value: socialProof.activeStudents, label: "Active students", suffix: "" },
                  {
                    value: Math.round(socialProof.buildsShipped / 1000),
                    label: "Builds shipped",
                    suffix: "k",
                  },
                  { value: socialProof.avgCompletionRate, label: "Finish rate", suffix: "%" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-white/[0.03] px-2 py-3"
                  >
                    <p className="font-display text-xl font-bold text-momentum">
                      <CountUp value={s.value} />
                      {s.suffix}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                “I used to plan projects for weeks and build nothing. Now I ship at 11pm and sleep
                proud.” — Meera, 3rd year, Coimbatore
              </p>
            </Panel>
          </ScrollReveal>
        </section>

        <div className="mt-10">
          <Button size="lg" variant="momentum" asChild>
            <Link to="/dashboard">
              Start my challenge <ArrowRight className="size-4" />
            </Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            No signup. Your progress stays on this device.
          </p>
        </div>
      </div>
    </div>
  );
}
