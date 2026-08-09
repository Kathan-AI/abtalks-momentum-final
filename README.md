# ABTalks-Momentum

A mobile-first redesign of ABTalks — a 60-day coding challenge for Indian
college students — built for the **ABTalks Vibe Code Hackathon** (Problem
Statement 1: Redesign ABTalks).

**Live app:** https://abtalks-momentum-final.vercel.app

## What it is

ABTalks Momentum reimagines the daily-build-challenge experience as a
**recovery-first** product. Instead of a plain streak counter that
punishes one missed day forever, it tracks a **Momentum Score** — a
score that rewards both consistency *and* recovery, so falling behind
never feels like the end of the challenge.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — explains the challenge, workflow, and proof-of-work model |
| `/dashboard` | Student home — streak, Momentum Score, today's task, progress, achievements, recovery card |
| `/day/:day` | A single challenge day — task detail, acceptance criteria, and proof submission (GitHub + LinkedIn + deployment links) |
| `/progress` | Full 60-day timeline |
| `/profile` | Student profile, portfolio export, preview states |

## Highlights

- **Live, date-driven progress** — the current day is computed from the
  real calendar date, not hardcoded. Missing a day never blocks future
  days from unlocking.
- **Transmission system** — a full-screen animated transition (a rocket
  built entirely from math notation — matrices, a confusion matrix,
  linear algebra) plays between major sections, with a distinct
  "homecoming" landing variant when returning to Home.
- **Scroll-triggered reveals** — each homepage section animates in with
  its own distinct entrance style as it scrolls into view.
- **Focus Timer** — a countdown scoped to each task's estimated build
  time, for late-night, time-boxed building sessions.
- **Momentum Forecast** — a live-computed projection of when the
  student is on pace to finish, based on their actual submission rate.
- **Portfolio Export** — one click compiles every submitted day's
  GitHub, LinkedIn, and deployment links into a resume-ready text block.
- **Preview states** — a built-in panel lets you preview every required
  edge case (first day, missed day, empty profile, challenge complete)
  without editing any data.

## Tech stack

TanStack Start, React, Tailwind CSS, Vite. No authentication, no
production database — student data is realistic mocked data, and
submissions persist to `localStorage`.

## AI usage

This project was built with Lovable and refined with Claude. The full
prompt log is in [`PROMPTS.md`](./PROMPTS.md).

## Local development

```sh
git clone https://github.com/Kathan-AI/abtalks-momentum-final.git
cd abtalks-momentum-final
npm install
npm run dev
```