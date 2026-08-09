# AI Usage Log — ABTalks Momentum

This project was built with Lovable for the initial implementation, and
with Claude for iterative refinement, bug fixes, and additional features.
Prompts are listed in the order they were given.

---

## Tool 1: Lovable — Initial build

### Prompt 1 — Core app build

```
Build a polished mobile-first web app called "ABTalks Momentum".

ABTalks is a 60-day coding challenge for Indian college students.
Every day, students build something, push a GitHub commit, and share
their learning on LinkedIn. Most users use the product on their phones
late at night after college.

Required routes:
1. /
2. /dashboard
3. /day/12

Important constraints:
- Optimize the entire experience for a 390px mobile viewport.
- Desktop is secondary.
- Do not add authentication.
- Do not add a production database.
- Generate realistic mocked data (student profile, 60-day task list
  with titles/descriptions/objectives, activity history) as a
  structured JS/TS data file — make it feel like a real cohort, not
  placeholder lorem ipsum.
- Use localStorage for submission persistence.
- Use reusable components.
- All important buttons must work.
- Do not create dead-looking interactive icons.

Product concept:
ABTalks Momentum is a recovery-first learning experience. Instead of
a plain streak counter, the product tracks a "Momentum Score" — a
score that rewards both consistency AND recovery. Missing a day and
coming back strong should visibly rebuild momentum, not just reset a
number to zero. This reframes failure as recoverable, not shameful.
If a student misses a day, the product should help them resume
without making them feel guilty.

Design system (be precise, don't default to generic Tailwind look):
- Background: deep navy (#0B1120 range), layered with subtle
  gradient noise, not flat black
- Accent 1 (progress/success): electric green (#3EE08C range)
- Accent 2 (interactive/CTA): electric blue (#4E9BFF range)
- Cards: rounded-2xl, soft inner border (1px, low-opacity white),
  subtle elevation shadow, glassmorphism-lite (slight blur on
  overlays only, not everywhere)
- Typography: a confident display font for headings (bold, tight
  tracking) + a clean readable font for body text — strong visual
  hierarchy, generous line height on body copy
- Spacing: consistent 4/8/12/16/24 scale, generous vertical rhythm so
  the app never feels cramped on mobile
- Buttons: large, touch-friendly (min 48px height), clear pressed
  state
- Bottom navigation: Home, Progress, Profile — icons must be
  functional, not decorative dead icons

Micro-interactions (keep tasteful, respect prefers-reduced-motion):
- Progress bar fills with animation on load
- Momentum Score updates with a subtle count-up animation
- Success state on submission includes a small celebratory animation
  (not full-screen confetti — tasteful, brief)
- Streak/momentum icon has a subtle glow or pulse when active

Landing page /:
- Hero heading: "60 days. 60 builds. A portfolio you can prove."
- Explain Build, Commit, Share, Continue workflow.
- Explain GitHub and LinkedIn proof of work.
- Show benefits for college students.
- Add CTA button "Start my challenge".
- CTA must navigate to /dashboard.
- Add a small social proof section with realistic mocked numbers.

Dashboard /dashboard:
- Show student name "Aarav".
- Show current Momentum Score and current streak of 11 days.
- Show "Day 12 of 60".
- Show progress percentage and progress bar.
- Show today's task: "Build a Flask REST API".
- Show estimated time: 45 minutes.
- Add button "Continue today's task" that navigates to /day/12.
- Show achievements.
- Show GitHub and LinkedIn proof status.
- Add a prominent "Momentum Recovery" card.
- Example text: "You missed Day 8. Your journey is not over. Resume
  today with one small build."
- Add recent activity timeline.
- Add a distinct "Challenge Complete" state design (for when
  completedDays reaches 60) showing a portfolio summary and a
  shareable completion badge — this state doesn't need to be the
  default view, but must be reachable/previewable, e.g. via a toggle
  or a mocked "preview completion state" link, since evaluators may
  want to see it without changing mock data manually.

Challenge page /day/12:
- Show Day 12 of 60.
- Show task title and detailed description.
- Show learning objective.
- Show acceptance criteria.
- Add fields for:
  1. GitHub repository URL
  2. GitHub commit URL
  3. LinkedIn post URL
  4. Live deployment URL
- Validate that fields are not empty.
- Validate that fields look like URLs.
- On submit, save data to localStorage.
- Show a polished success state after submission.
- Show GitHub, LinkedIn, and deployment proof statuses.
- If already submitted, show "Proof submitted" instead of empty form.
- Add a back button to /dashboard.

Required edge cases:
- First-day state with streak 0 and Momentum Score 0.
- Missed-day state.
- Empty profile state.
- Already-submitted state.
- Empty form validation state.
- Challenge-complete state (Day 60 reached).

Make the whole app feel like a real product, not a generic dashboard.
Use realistic Indian college student copy, but do not use stereotypes.
Ensure no horizontal scrolling at 390px. Make a high-tech user
interface with genuine creativity.
```

### Prompt 2 — Transmission animation, live date logic, day-unlock fix, signature highlight system

```
Implement the following refinements to the ABTalks Momentum app.
These replace the previous static mock-data approach with live,
date-driven logic, and add a new full-screen transition animation.

1. TRANSMISSION SCREEN — full-screen animated transition
Build a full-screen overlay component ("TransmissionOverlay") that
plays whenever the user navigates between major sections (e.g. Home
to Dashboard, Dashboard to Day page).

Centerpiece — the rocket:
- Build the rocket's entire silhouette out of dense mathematical
  content — no empty or blank space anywhere inside the rocket body.
- Fill it with: matrix grids, linear algebra notation (vectors, dot
  products, transformations), a confusion matrix (2x2 grid labeled
  TP / FP / FN / TN), and core calculus notation (derivatives,
  integrals, summations).
- Arrange these tightly and in layers so the rocket reads as "built
  entirely from math" at a glance — dense, technical, glowing thin
  linework in the electric green/blue palette on the dark navy
  background.

Exhaust and concept trail:
- From the rocket's base/flame, rapidly emit a trail of small glowing
  icon badges representing core AI/ML concepts: RAG, LLM, LangChain,
  Vector DB, Agents, MCP, Transformers, Embeddings — staggered, fast
  timing, as if being expelled by the thrust.

Sequence: overlay appears full-screen with the rocket already
assembled → icon trail bursts from the exhaust → rocket flies upward
off-screen, icons trailing behind → destination content fades/slides
in underneath. Total duration under ~1.2–1.5s. Trigger only on major
section switches, and respect prefers-reduced-motion (fall back to a
simple fade).

2. DYNAMIC DATE / CURRENT-DAY LOGIC
Remove hardcoded currentDay/joinedOn values. Store a single fixed
reference date (joinedOn), and compute currentDay live from the real
system date: currentDay = min(60, daysElapsedSince(joinedOn) + 1).
This must auto-advance by 1 every real calendar day with no manual
updates. Display the actual joined date formatted naturally.

3. DAY STATUS / UNLOCK LOGIC (missed day must not block later days)
Recompute each day's status from the live currentDay only:
- locked → day number > currentDay
- pending → day number == currentDay AND no submission
- submitted → day number <= currentDay AND a submission exists
- missed → day number < currentDay AND no submission exists
Days unlock purely by calendar date elapsed since joining — a missed
day only affects streak/missed-count, never future availability.
Streak = consecutive submitted days counting back from currentDay-1;
a miss resets it but doesn't block resubmission going forward. Update
the "Momentum Recovery" card to reference the actual missed day(s)
dynamically instead of a hardcoded reference. Implement all of this
as live computed logic in code, not static JSON.

4. SIGNATURE HIGHLIGHT SYSTEM
Add a distinct "pulse-ring" signature style for every circular/dot
element that is active, selected, or in-progress (streak ring,
progress ring, day-status dots, nav icons, achievement badges, avatar
ring): a thin detached outer ring in the electric accent color with a
slow continuous soft pulse, plus a slightly larger/more saturated
fill than inactive circles. Inactive circles of the same family stay
visually quiet (muted, no ring, no motion) so active vs. inactive is
obvious at a glance. Apply this consistently everywhere a circular
active-state exists in the app.
```

---

## Tool 2: Claude — Refinement, code review, and additional features

### Prompt 3 — Fix homepage entrance animation and hardcoded day link

```
Fix two things in the existing ABTalks Momentum app:

1. Homepage entrance "transmission" moment
   The TransmissionOverlay currently only plays when switching between
   already-visited sections — it never plays on the very first page
   load. Add a distinct entrance sequence specifically for the home
   page's first load: on initial mount of the "/" route only, before
   the hero content renders, play a brief terminal-style boot
   sequence — a few lines of monospace text typing out character-by-
   character at high speed, with a blinking cursor. Fast (under 1
   second), plays once per session (sessionStorage), respects
   prefers-reduced-motion, then reveals the hero content.

2. Fix hardcoded day link on the homepage
   The "Peek at today's build" button links to a hardcoded /day/12.
   Compute the live current day and link to it dynamically instead,
   so this button always points to today's real task regardless of
   the date.
```

### Prompt 4 — Premium features and additional polish

```
Review the actual generated codebase (uploaded as a zip) against all
prior requirements, confirm what's already correctly implemented, and
add the following premium features:

1. Focus Timer (Day page): a countdown timer scoped to each task's
   estimated build time, with play/pause and a visual progress
   indicator — helping a late-night student time-box tonight's build.

2. Momentum Forecast (Dashboard): a computed projection line showing
   the date the student is on pace to finish the 60-day challenge,
   based on their actual submission rate so far — not a static
   message.

3. Portfolio Export (Profile page): a "Copy my portfolio" action that
   compiles every submitted day's GitHub, LinkedIn, and deployment
   links into a single clean, resume-ready text block on the
   clipboard.

4. Tactile circle highlight: add a fast hover/press highlight to
   every interactive circular element (nav icons, timer button) —
   distinct from the existing slow ambient "active state" pulse-ring
   — so any circle reacts immediately and visibly to touch or cursor
   contact, not only when it's the currently-active one.

5. Homecoming transmission variant: give the transition overlay a
   distinct "landing" variant specifically when the destination is
   Home (e.g. navigating there from the "About ABTalks Momentum"
   link) — the rocket descends and settles instead of launching, with
   a "Welcome back to ABTalks" label — so returning home reads
   differently from moving deeper into the app.

Verify everything compiles cleanly (type-check and production build)
before delivering.
```

### Prompt 5 — Scroll-triggered reveal animations on the homepage

```
Add scroll-triggered reveal animations to the homepage so the full
page doesn't render all at once — content should progressively appear
as the user scrolls. Each section should have its own distinct
entrance style, triggered once via IntersectionObserver, and must
respect prefers-reduced-motion:

- "Why Momentum, not streaks" explainer panel: resolves in from a
  soft blur + scale ("assemble" style, echoing the transmission/math
  motif).
- Build/Commit/Share/Continue workflow steps, and the campus-life
  benefits list: rise up from below, staggered one after another.
- GitHub and LinkedIn proof-of-work cards: slide in from opposite
  directions (GitHub from the left, LinkedIn from the right).
- Social proof stats panel: resolves in with the same "assemble"
  style, as a closing bookend.

Ensure valid HTML — list items must not be wrapped in a stray <div>
when the parent is a <ul>.
```

---

## Notes

- Mock/cohort data (student profile, 60-day task list, activity
  history) was generated with AI assistance to feel like a realistic
  cohort rather than placeholder content.
- All day-unlock, streak, momentum score, and forecast logic is
  computed live in code from the real system date — nothing is
  hardcoded or manually updated.
- Every change above was verified with a TypeScript type-check
  (`tsc --noEmit`) and a full production build (`npm run build`)
  before being delivered.
