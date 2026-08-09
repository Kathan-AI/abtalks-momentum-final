# ABTalks Momentum

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

- already shared mocked data make sure(student profile, 60-day task

  list with titles/descriptions/objectives, activity history) as a

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

- Typography: a confident display font for headings (bold,

  tight tracking) + a clean readable font for body text — strong

  visual hierarchy, generous line height on body copy

- Spacing: consistent 4/8/12/16/24 scale, generous vertical rhythm

  so the app never feels cramped on mobile

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

- Example text: "You missed Day 8. Your journey is not over.

  Resume today with one small build."

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

Ensure no horizontal scrolling at 390px. make a high-tech user interface with surten creativity so make it

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/702e7cce-d61e-4c95-951b-7c40a7f5b663).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
