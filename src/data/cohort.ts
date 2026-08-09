// Mock cohort content for ABTalks Momentum (no backend).
// NOTE: currentDay / joinedOn are NOT hardcoded here — see src/lib/challenge-date.ts.
import { JOINED_ON, computeCurrentDay } from "@/lib/challenge-date";
export type DayStatus = "submitted" | "missed" | "pending" | "locked";

export interface Submission {
  githubRepoUrl: string;
  githubCommitUrl: string;
  linkedinPostUrl: string;
  liveDeploymentUrl: string;
  submittedAt: string;
}

export interface ChallengeDay {
  day: number;
  title: string;
  shortDescription: string;
  description: string;
  learningObjective: string;
  acceptanceCriteria: string[];
  estimatedTimeMinutes: number;
  status: DayStatus;
  submission: Submission | null;
}

export interface Student {
  name: string;
  track: string;
  currentStreak: number;
  longestStreak: number;
  momentumScore: number;
  currentDay: number;
  totalDays: number;
  completedDays: number;
  missedDays: number;
  joinedOn: string;
  githubUsername: string;
  linkedinHandle: string;
}

export type ActivityType = "submission" | "missed" | "achievement";

export interface ActivityItem {
  day: number;
  type: ActivityType;
  message: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedOnDay: number | null;
}

export const student: Student = {
  "name": "Aarav",
  "track": "Full Stack Development",
  "currentStreak": 11,
  "longestStreak": 11,
  "momentumScore": 78,
  "currentDay": computeCurrentDay(),
  "totalDays": 60,
  "completedDays": 11,
  "missedDays": 1,
  "joinedOn": JOINED_ON,
  "githubUsername": "aarav-dev",
  "linkedinHandle": "aarav-dev"
};

export const days: ChallengeDay[] = [
  {
    "day": 1,
    "title": "Set up your GitHub profile for recruiters",
    "shortDescription": "Create a clean, professional GitHub profile README that recruiters will actually notice.",
    "description": "Create a clean, professional GitHub profile README that recruiters will actually notice. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand what makes a developer profile stand out.",
    "acceptanceCriteria": [
      "Profile README created",
      "Pinned repos updated",
      "Bio and contact info added"
    ],
    "estimatedTimeMinutes": 75,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-1",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-1/commit/a1b2c3d",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day1-abtalks-activity",
      "liveDeploymentUrl": "",
      "submittedAt": "2026-07-01T22:14:00+05:30"
    }
  },
  {
    "day": 2,
    "title": "Build a personal portfolio landing page",
    "shortDescription": "Design and build a single-page portfolio site introducing yourself and your work.",
    "description": "Design and build a single-page portfolio site introducing yourself and your work. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice semantic HTML and responsive layout basics.",
    "acceptanceCriteria": [
      "Page is mobile responsive",
      "Includes About, Projects, Contact sections",
      "Deployed and live"
    ],
    "estimatedTimeMinutes": 30,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-2",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-2/commit/a1b2c3d",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day2-abtalks-activity",
      "liveDeploymentUrl": "",
      "submittedAt": "2026-07-02T22:14:00+05:30"
    }
  },
  {
    "day": 3,
    "title": "Build a To-Do List app",
    "shortDescription": "Create a functional to-do app with add, complete, and delete features.",
    "description": "Create a functional to-do app with add, complete, and delete features. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice DOM manipulation and state handling.",
    "acceptanceCriteria": [
      "Can add and remove tasks",
      "State persists on refresh",
      "UI is clean and usable"
    ],
    "estimatedTimeMinutes": 30,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-3",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-3/commit/a1b2c3d",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day3-abtalks-activity",
      "liveDeploymentUrl": "https://abtalks-day-3.vercel.app",
      "submittedAt": "2026-07-03T22:14:00+05:30"
    }
  },
  {
    "day": 4,
    "title": "Build a Markdown previewer",
    "shortDescription": "Build a live markdown editor with real-time preview.",
    "description": "Build a live markdown editor with real-time preview. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand text parsing and live UI updates.",
    "acceptanceCriteria": [
      "Live preview updates on typing",
      "Supports headings, bold, lists",
      "No crashes on invalid input"
    ],
    "estimatedTimeMinutes": 75,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-4",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-4/commit/a1b2c3d",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day4-abtalks-activity",
      "liveDeploymentUrl": "https://abtalks-day-4.vercel.app",
      "submittedAt": "2026-07-04T22:14:00+05:30"
    }
  },
  {
    "day": 5,
    "title": "Consume a public REST API",
    "shortDescription": "Fetch and display data from a public API of your choice.",
    "description": "Fetch and display data from a public API of your choice. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice async requests and error handling.",
    "acceptanceCriteria": [
      "Data fetched and rendered",
      "Loading and error states handled",
      "Code is readable"
    ],
    "estimatedTimeMinutes": 45,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-5",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-5/commit/a1b2c3d",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day5-abtalks-activity",
      "liveDeploymentUrl": "https://abtalks-day-5.vercel.app",
      "submittedAt": "2026-07-05T22:14:00+05:30"
    }
  },
  {
    "day": 6,
    "title": "Build a weather dashboard",
    "shortDescription": "Build a small app that shows weather for a searched city using a public API.",
    "description": "Build a small app that shows weather for a searched city using a public API. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice working with third-party API responses.",
    "acceptanceCriteria": [
      "Search works for valid cities",
      "Handles invalid city gracefully",
      "Shows temperature and conditions"
    ],
    "estimatedTimeMinutes": 45,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-6",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-6/commit/a1b2c3d",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day6-abtalks-activity",
      "liveDeploymentUrl": "https://abtalks-day-6.vercel.app",
      "submittedAt": "2026-07-06T22:14:00+05:30"
    }
  },
  {
    "day": 7,
    "title": "Build a REST API with Express",
    "shortDescription": "Create a basic REST API with CRUD endpoints using Express.js.",
    "description": "Create a basic REST API with CRUD endpoints using Express.js. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand REST conventions and route design.",
    "acceptanceCriteria": [
      "GET, POST, PUT, DELETE implemented",
      "Proper status codes returned",
      "Tested with Postman"
    ],
    "estimatedTimeMinutes": 45,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-7",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-7/commit/a1b2c3d",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day7-abtalks-activity",
      "liveDeploymentUrl": "https://abtalks-day-7.vercel.app",
      "submittedAt": "2026-07-07T22:14:00+05:30"
    }
  },
  {
    "day": 8,
    "title": "Add authentication basics",
    "shortDescription": "Add a simple login/signup flow to an existing project (mocked, no real DB needed).",
    "description": "Add a simple login/signup flow to an existing project (mocked, no real DB needed). Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand authentication flow at a conceptual level.",
    "acceptanceCriteria": [
      "Login form validates input",
      "Session state is tracked",
      "Protected route redirects if not logged in"
    ],
    "estimatedTimeMinutes": 45,
    "status": "missed",
    "submission": null
  },
  {
    "day": 9,
    "title": "Build a Flask REST API",
    "shortDescription": "Build a REST API using Flask with endpoints for a simple resource (e.g. notes or tasks).",
    "description": "Build a REST API using Flask with endpoints for a simple resource (e.g. notes or tasks). Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand Python-based backend API design and request handling.",
    "acceptanceCriteria": [
      "CRUD endpoints implemented",
      "Returns proper JSON responses",
      "Basic error handling included"
    ],
    "estimatedTimeMinutes": 75,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-9",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-9/commit/e4f5g6h",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day9-abtalks-activity",
      "liveDeploymentUrl": "https://abtalks-day-9.vercel.app",
      "submittedAt": "2026-08-02T21:40:00+05:30"
    }
  },
  {
    "day": 10,
    "title": "Connect frontend to backend",
    "shortDescription": "Connect a frontend app to a backend API you've built, replacing mock data with real calls.",
    "description": "Connect a frontend app to a backend API you've built, replacing mock data with real calls. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice full-stack data flow.",
    "acceptanceCriteria": [
      "Frontend fetches real data",
      "Loading/error states handled",
      "No CORS errors"
    ],
    "estimatedTimeMinutes": 30,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-10",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-10/commit/e4f5g6h",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day10-abtalks-activity",
      "liveDeploymentUrl": "https://abtalks-day-10.vercel.app",
      "submittedAt": "2026-08-03T21:40:00+05:30"
    }
  },
  {
    "day": 11,
    "title": "Build a URL shortener",
    "shortDescription": "Build a simple URL shortening service with a backend and a minimal frontend.",
    "description": "Build a simple URL shortening service with a backend and a minimal frontend. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice unique ID generation and redirect logic.",
    "acceptanceCriteria": [
      "Shortened URLs redirect correctly",
      "Handles duplicate/invalid URLs",
      "Basic UI to generate links"
    ],
    "estimatedTimeMinutes": 75,
    "status": "submitted",
    "submission": {
      "githubRepoUrl": "https://github.com/aarav-dev/abtalks-day-11",
      "githubCommitUrl": "https://github.com/aarav-dev/abtalks-day-11/commit/e4f5g6h",
      "linkedinPostUrl": "https://linkedin.com/posts/aarav-dev_day11-abtalks-activity",
      "liveDeploymentUrl": "https://abtalks-day-11.vercel.app",
      "submittedAt": "2026-08-04T21:40:00+05:30"
    }
  },
  {
    "day": 12,
    "title": "Build a Flask REST API",
    "shortDescription": "Build a REST API using Flask with endpoints for a simple notes resource.",
    "description": "Build a small but complete REST API using Flask for a 'notes' resource. Implement create, read, update, and delete endpoints, return proper JSON responses, and handle basic errors (like missing fields or invalid IDs) gracefully. This is the kind of API design question that comes up often in backend interviews.",
    "learningObjective": "Understand Python-based backend API design, routing, and request/response handling.",
    "acceptanceCriteria": [
      "GET, POST, PUT, DELETE endpoints implemented for /notes",
      "Returns correct HTTP status codes (200, 201, 400, 404)",
      "Invalid or missing input returns a clear JSON error message",
      "Tested manually with Postman or curl"
    ],
    "estimatedTimeMinutes": 45,
    "status": "pending",
    "submission": null
  },
  {
    "day": 13,
    "title": "Build a chat UI (mocked)",
    "shortDescription": "Build a chat interface with mocked messages and a working input box.",
    "description": "Build a chat interface with mocked messages and a working input box. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice component composition and list rendering.",
    "acceptanceCriteria": [
      "Messages render in a list",
      "Input sends new message to UI",
      "Scrolls to latest message"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 14,
    "title": "Add form validation",
    "shortDescription": "Add robust client-side validation to a multi-field form.",
    "description": "Add robust client-side validation to a multi-field form. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice UX-friendly validation patterns.",
    "acceptanceCriteria": [
      "Required fields validated",
      "Clear error messages shown",
      "Submit blocked until valid"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 15,
    "title": "Build a recipe finder app",
    "shortDescription": "Build an app that searches recipes using a public API and displays results.",
    "description": "Build an app that searches recipes using a public API and displays results. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice search UX and API integration.",
    "acceptanceCriteria": [
      "Search returns relevant results",
      "Empty state handled",
      "Recipe details view works"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 16,
    "title": "Learn and use Docker basics",
    "shortDescription": "Containerize one of your earlier projects using Docker.",
    "description": "Containerize one of your earlier projects using Docker. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand containerization fundamentals.",
    "acceptanceCriteria": [
      "Dockerfile builds successfully",
      "App runs inside container",
      "README documents run steps"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 17,
    "title": "Build a simple ML text classifier",
    "shortDescription": "Train a basic text classifier (e.g. spam detection) using scikit-learn.",
    "description": "Train a basic text classifier (e.g. spam detection) using scikit-learn. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand basic supervised learning workflow.",
    "acceptanceCriteria": [
      "Model trains without errors",
      "Accuracy reported on test set",
      "Predicts on new sample text"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 18,
    "title": "Deploy a full-stack app",
    "shortDescription": "Deploy an earlier full-stack project to a live host (Vercel/Render/Railway).",
    "description": "Deploy an earlier full-stack project to a live host (Vercel/Render/Railway). Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice deployment and environment configuration.",
    "acceptanceCriteria": [
      "App is live and reachable",
      "Environment variables configured",
      "No broken routes in production"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 19,
    "title": "Build a habit tracker",
    "shortDescription": "Build an app to track daily habits with streaks, similar to this challenge itself.",
    "description": "Build an app to track daily habits with streaks, similar to this challenge itself. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice state persistence and streak logic.",
    "acceptanceCriteria": [
      "Can add/check off habits",
      "Streak count updates correctly",
      "Data persists across reloads"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 20,
    "title": "Write unit tests for your API",
    "shortDescription": "Add unit tests for the backend endpoints you built earlier.",
    "description": "Add unit tests for the backend endpoints you built earlier. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand testing fundamentals and reliability.",
    "acceptanceCriteria": [
      "At least 5 test cases written",
      "Tests cover success and error paths",
      "All tests pass"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 21,
    "title": "Set up your GitHub profile for recruiters",
    "shortDescription": "Create a clean, professional GitHub profile README that recruiters will actually notice.",
    "description": "Create a clean, professional GitHub profile README that recruiters will actually notice. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand what makes a developer profile stand out.",
    "acceptanceCriteria": [
      "Profile README created",
      "Pinned repos updated",
      "Bio and contact info added"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 22,
    "title": "Build a personal portfolio landing page",
    "shortDescription": "Design and build a single-page portfolio site introducing yourself and your work.",
    "description": "Design and build a single-page portfolio site introducing yourself and your work. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice semantic HTML and responsive layout basics.",
    "acceptanceCriteria": [
      "Page is mobile responsive",
      "Includes About, Projects, Contact sections",
      "Deployed and live"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 23,
    "title": "Build a To-Do List app",
    "shortDescription": "Create a functional to-do app with add, complete, and delete features.",
    "description": "Create a functional to-do app with add, complete, and delete features. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice DOM manipulation and state handling.",
    "acceptanceCriteria": [
      "Can add and remove tasks",
      "State persists on refresh",
      "UI is clean and usable"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 24,
    "title": "Build a Markdown previewer",
    "shortDescription": "Build a live markdown editor with real-time preview.",
    "description": "Build a live markdown editor with real-time preview. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand text parsing and live UI updates.",
    "acceptanceCriteria": [
      "Live preview updates on typing",
      "Supports headings, bold, lists",
      "No crashes on invalid input"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 25,
    "title": "Consume a public REST API",
    "shortDescription": "Fetch and display data from a public API of your choice.",
    "description": "Fetch and display data from a public API of your choice. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice async requests and error handling.",
    "acceptanceCriteria": [
      "Data fetched and rendered",
      "Loading and error states handled",
      "Code is readable"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 26,
    "title": "Build a weather dashboard",
    "shortDescription": "Build a small app that shows weather for a searched city using a public API.",
    "description": "Build a small app that shows weather for a searched city using a public API. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice working with third-party API responses.",
    "acceptanceCriteria": [
      "Search works for valid cities",
      "Handles invalid city gracefully",
      "Shows temperature and conditions"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 27,
    "title": "Build a REST API with Express",
    "shortDescription": "Create a basic REST API with CRUD endpoints using Express.js.",
    "description": "Create a basic REST API with CRUD endpoints using Express.js. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand REST conventions and route design.",
    "acceptanceCriteria": [
      "GET, POST, PUT, DELETE implemented",
      "Proper status codes returned",
      "Tested with Postman"
    ],
    "estimatedTimeMinutes": 75,
    "status": "locked",
    "submission": null
  },
  {
    "day": 28,
    "title": "Add authentication basics",
    "shortDescription": "Add a simple login/signup flow to an existing project (mocked, no real DB needed).",
    "description": "Add a simple login/signup flow to an existing project (mocked, no real DB needed). Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand authentication flow at a conceptual level.",
    "acceptanceCriteria": [
      "Login form validates input",
      "Session state is tracked",
      "Protected route redirects if not logged in"
    ],
    "estimatedTimeMinutes": 75,
    "status": "locked",
    "submission": null
  },
  {
    "day": 29,
    "title": "Build a Flask REST API",
    "shortDescription": "Build a REST API using Flask with endpoints for a simple resource (e.g. notes or tasks).",
    "description": "Build a REST API using Flask with endpoints for a simple resource (e.g. notes or tasks). Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand Python-based backend API design and request handling.",
    "acceptanceCriteria": [
      "CRUD endpoints implemented",
      "Returns proper JSON responses",
      "Basic error handling included"
    ],
    "estimatedTimeMinutes": 75,
    "status": "locked",
    "submission": null
  },
  {
    "day": 30,
    "title": "Connect frontend to backend",
    "shortDescription": "Connect a frontend app to a backend API you've built, replacing mock data with real calls.",
    "description": "Connect a frontend app to a backend API you've built, replacing mock data with real calls. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice full-stack data flow.",
    "acceptanceCriteria": [
      "Frontend fetches real data",
      "Loading/error states handled",
      "No CORS errors"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 31,
    "title": "Build a URL shortener",
    "shortDescription": "Build a simple URL shortening service with a backend and a minimal frontend.",
    "description": "Build a simple URL shortening service with a backend and a minimal frontend. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice unique ID generation and redirect logic.",
    "acceptanceCriteria": [
      "Shortened URLs redirect correctly",
      "Handles duplicate/invalid URLs",
      "Basic UI to generate links"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 32,
    "title": "Work with a SQL database",
    "shortDescription": "Set up a small SQLite/Postgres database and connect it to your backend.",
    "description": "Set up a small SQLite/Postgres database and connect it to your backend. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand schema design and basic queries.",
    "acceptanceCriteria": [
      "Schema designed with at least 2 tables",
      "CRUD operations work against DB",
      "Data persists correctly"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 33,
    "title": "Build a chat UI (mocked)",
    "shortDescription": "Build a chat interface with mocked messages and a working input box.",
    "description": "Build a chat interface with mocked messages and a working input box. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice component composition and list rendering.",
    "acceptanceCriteria": [
      "Messages render in a list",
      "Input sends new message to UI",
      "Scrolls to latest message"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 34,
    "title": "Add form validation",
    "shortDescription": "Add robust client-side validation to a multi-field form.",
    "description": "Add robust client-side validation to a multi-field form. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice UX-friendly validation patterns.",
    "acceptanceCriteria": [
      "Required fields validated",
      "Clear error messages shown",
      "Submit blocked until valid"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 35,
    "title": "Build a recipe finder app",
    "shortDescription": "Build an app that searches recipes using a public API and displays results.",
    "description": "Build an app that searches recipes using a public API and displays results. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice search UX and API integration.",
    "acceptanceCriteria": [
      "Search returns relevant results",
      "Empty state handled",
      "Recipe details view works"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 36,
    "title": "Learn and use Docker basics",
    "shortDescription": "Containerize one of your earlier projects using Docker.",
    "description": "Containerize one of your earlier projects using Docker. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand containerization fundamentals.",
    "acceptanceCriteria": [
      "Dockerfile builds successfully",
      "App runs inside container",
      "README documents run steps"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 37,
    "title": "Build a simple ML text classifier",
    "shortDescription": "Train a basic text classifier (e.g. spam detection) using scikit-learn.",
    "description": "Train a basic text classifier (e.g. spam detection) using scikit-learn. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand basic supervised learning workflow.",
    "acceptanceCriteria": [
      "Model trains without errors",
      "Accuracy reported on test set",
      "Predicts on new sample text"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 38,
    "title": "Deploy a full-stack app",
    "shortDescription": "Deploy an earlier full-stack project to a live host (Vercel/Render/Railway).",
    "description": "Deploy an earlier full-stack project to a live host (Vercel/Render/Railway). Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice deployment and environment configuration.",
    "acceptanceCriteria": [
      "App is live and reachable",
      "Environment variables configured",
      "No broken routes in production"
    ],
    "estimatedTimeMinutes": 75,
    "status": "locked",
    "submission": null
  },
  {
    "day": 39,
    "title": "Build a habit tracker",
    "shortDescription": "Build an app to track daily habits with streaks, similar to this challenge itself.",
    "description": "Build an app to track daily habits with streaks, similar to this challenge itself. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice state persistence and streak logic.",
    "acceptanceCriteria": [
      "Can add/check off habits",
      "Streak count updates correctly",
      "Data persists across reloads"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 40,
    "title": "Write unit tests for your API",
    "shortDescription": "Add unit tests for the backend endpoints you built earlier.",
    "description": "Add unit tests for the backend endpoints you built earlier. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand testing fundamentals and reliability.",
    "acceptanceCriteria": [
      "At least 5 test cases written",
      "Tests cover success and error paths",
      "All tests pass"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 41,
    "title": "Set up your GitHub profile for recruiters",
    "shortDescription": "Create a clean, professional GitHub profile README that recruiters will actually notice.",
    "description": "Create a clean, professional GitHub profile README that recruiters will actually notice. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand what makes a developer profile stand out.",
    "acceptanceCriteria": [
      "Profile README created",
      "Pinned repos updated",
      "Bio and contact info added"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 42,
    "title": "Build a personal portfolio landing page",
    "shortDescription": "Design and build a single-page portfolio site introducing yourself and your work.",
    "description": "Design and build a single-page portfolio site introducing yourself and your work. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice semantic HTML and responsive layout basics.",
    "acceptanceCriteria": [
      "Page is mobile responsive",
      "Includes About, Projects, Contact sections",
      "Deployed and live"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 43,
    "title": "Build a To-Do List app",
    "shortDescription": "Create a functional to-do app with add, complete, and delete features.",
    "description": "Create a functional to-do app with add, complete, and delete features. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice DOM manipulation and state handling.",
    "acceptanceCriteria": [
      "Can add and remove tasks",
      "State persists on refresh",
      "UI is clean and usable"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 44,
    "title": "Build a Markdown previewer",
    "shortDescription": "Build a live markdown editor with real-time preview.",
    "description": "Build a live markdown editor with real-time preview. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand text parsing and live UI updates.",
    "acceptanceCriteria": [
      "Live preview updates on typing",
      "Supports headings, bold, lists",
      "No crashes on invalid input"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 45,
    "title": "Consume a public REST API",
    "shortDescription": "Fetch and display data from a public API of your choice.",
    "description": "Fetch and display data from a public API of your choice. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice async requests and error handling.",
    "acceptanceCriteria": [
      "Data fetched and rendered",
      "Loading and error states handled",
      "Code is readable"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 46,
    "title": "Build a weather dashboard",
    "shortDescription": "Build a small app that shows weather for a searched city using a public API.",
    "description": "Build a small app that shows weather for a searched city using a public API. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice working with third-party API responses.",
    "acceptanceCriteria": [
      "Search works for valid cities",
      "Handles invalid city gracefully",
      "Shows temperature and conditions"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 47,
    "title": "Build a REST API with Express",
    "shortDescription": "Create a basic REST API with CRUD endpoints using Express.js.",
    "description": "Create a basic REST API with CRUD endpoints using Express.js. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand REST conventions and route design.",
    "acceptanceCriteria": [
      "GET, POST, PUT, DELETE implemented",
      "Proper status codes returned",
      "Tested with Postman"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 48,
    "title": "Add authentication basics",
    "shortDescription": "Add a simple login/signup flow to an existing project (mocked, no real DB needed).",
    "description": "Add a simple login/signup flow to an existing project (mocked, no real DB needed). Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand authentication flow at a conceptual level.",
    "acceptanceCriteria": [
      "Login form validates input",
      "Session state is tracked",
      "Protected route redirects if not logged in"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 49,
    "title": "Build a Flask REST API",
    "shortDescription": "Build a REST API using Flask with endpoints for a simple resource (e.g. notes or tasks).",
    "description": "Build a REST API using Flask with endpoints for a simple resource (e.g. notes or tasks). Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand Python-based backend API design and request handling.",
    "acceptanceCriteria": [
      "CRUD endpoints implemented",
      "Returns proper JSON responses",
      "Basic error handling included"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 50,
    "title": "Connect frontend to backend",
    "shortDescription": "Connect a frontend app to a backend API you've built, replacing mock data with real calls.",
    "description": "Connect a frontend app to a backend API you've built, replacing mock data with real calls. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice full-stack data flow.",
    "acceptanceCriteria": [
      "Frontend fetches real data",
      "Loading/error states handled",
      "No CORS errors"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 51,
    "title": "Build a URL shortener",
    "shortDescription": "Build a simple URL shortening service with a backend and a minimal frontend.",
    "description": "Build a simple URL shortening service with a backend and a minimal frontend. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice unique ID generation and redirect logic.",
    "acceptanceCriteria": [
      "Shortened URLs redirect correctly",
      "Handles duplicate/invalid URLs",
      "Basic UI to generate links"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 52,
    "title": "Work with a SQL database",
    "shortDescription": "Set up a small SQLite/Postgres database and connect it to your backend.",
    "description": "Set up a small SQLite/Postgres database and connect it to your backend. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand schema design and basic queries.",
    "acceptanceCriteria": [
      "Schema designed with at least 2 tables",
      "CRUD operations work against DB",
      "Data persists correctly"
    ],
    "estimatedTimeMinutes": 45,
    "status": "locked",
    "submission": null
  },
  {
    "day": 53,
    "title": "Build a chat UI (mocked)",
    "shortDescription": "Build a chat interface with mocked messages and a working input box.",
    "description": "Build a chat interface with mocked messages and a working input box. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice component composition and list rendering.",
    "acceptanceCriteria": [
      "Messages render in a list",
      "Input sends new message to UI",
      "Scrolls to latest message"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 54,
    "title": "Add form validation",
    "shortDescription": "Add robust client-side validation to a multi-field form.",
    "description": "Add robust client-side validation to a multi-field form. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice UX-friendly validation patterns.",
    "acceptanceCriteria": [
      "Required fields validated",
      "Clear error messages shown",
      "Submit blocked until valid"
    ],
    "estimatedTimeMinutes": 75,
    "status": "locked",
    "submission": null
  },
  {
    "day": 55,
    "title": "Build a recipe finder app",
    "shortDescription": "Build an app that searches recipes using a public API and displays results.",
    "description": "Build an app that searches recipes using a public API and displays results. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice search UX and API integration.",
    "acceptanceCriteria": [
      "Search returns relevant results",
      "Empty state handled",
      "Recipe details view works"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 56,
    "title": "Learn and use Docker basics",
    "shortDescription": "Containerize one of your earlier projects using Docker.",
    "description": "Containerize one of your earlier projects using Docker. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand containerization fundamentals.",
    "acceptanceCriteria": [
      "Dockerfile builds successfully",
      "App runs inside container",
      "README documents run steps"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 57,
    "title": "Build a simple ML text classifier",
    "shortDescription": "Train a basic text classifier (e.g. spam detection) using scikit-learn.",
    "description": "Train a basic text classifier (e.g. spam detection) using scikit-learn. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand basic supervised learning workflow.",
    "acceptanceCriteria": [
      "Model trains without errors",
      "Accuracy reported on test set",
      "Predicts on new sample text"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 58,
    "title": "Deploy a full-stack app",
    "shortDescription": "Deploy an earlier full-stack project to a live host (Vercel/Render/Railway).",
    "description": "Deploy an earlier full-stack project to a live host (Vercel/Render/Railway). Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice deployment and environment configuration.",
    "acceptanceCriteria": [
      "App is live and reachable",
      "Environment variables configured",
      "No broken routes in production"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  },
  {
    "day": 59,
    "title": "Build a habit tracker",
    "shortDescription": "Build an app to track daily habits with streaks, similar to this challenge itself.",
    "description": "Build an app to track daily habits with streaks, similar to this challenge itself. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Practice state persistence and streak logic.",
    "acceptanceCriteria": [
      "Can add/check off habits",
      "Streak count updates correctly",
      "Data persists across reloads"
    ],
    "estimatedTimeMinutes": 30,
    "status": "locked",
    "submission": null
  },
  {
    "day": 60,
    "title": "Write unit tests for your API",
    "shortDescription": "Add unit tests for the backend endpoints you built earlier.",
    "description": "Add unit tests for the backend endpoints you built earlier. Focus on writing clean, working code you can confidently explain in an interview.",
    "learningObjective": "Understand testing fundamentals and reliability.",
    "acceptanceCriteria": [
      "At least 5 test cases written",
      "Tests cover success and error paths",
      "All tests pass"
    ],
    "estimatedTimeMinutes": 60,
    "status": "locked",
    "submission": null
  }
];

export const activity: ActivityItem[] = [
  {
    "day": 11,
    "type": "submission",
    "message": "Submitted Day 11: Write unit tests for your API",
    "timestamp": "2026-08-04T21:40:00+05:30"
  },
  {
    "day": 10,
    "type": "submission",
    "message": "Submitted Day 10: Build a habit tracker",
    "timestamp": "2026-08-03T22:05:00+05:30"
  },
  {
    "day": 9,
    "type": "submission",
    "message": "Submitted Day 9: Deploy a full-stack app",
    "timestamp": "2026-08-02T20:50:00+05:30"
  },
  {
    "day": 8,
    "type": "missed",
    "message": "Missed Day 8: Build a simple ML text classifier",
    "timestamp": "2026-08-01T23:59:00+05:30"
  },
  {
    "day": 7,
    "type": "achievement",
    "message": "Unlocked achievement: 7-Day Streak",
    "timestamp": "2026-07-31T21:15:00+05:30"
  },
  {
    "day": 7,
    "type": "submission",
    "message": "Submitted Day 7: Learn and use Docker basics",
    "timestamp": "2026-07-31T21:10:00+05:30"
  }
];

export const achievements: Achievement[] = [
  {
    "id": "first-submission",
    "title": "First Submission",
    "description": "Completed your very first challenge day.",
    "unlocked": true,
    "unlockedOnDay": 1
  },
  {
    "id": "seven-day-streak",
    "title": "7-Day Streak",
    "description": "Stayed consistent for a full week.",
    "unlocked": true,
    "unlockedOnDay": 7
  },
  {
    "id": "comeback-kid",
    "title": "Comeback Kid",
    "description": "Resumed the challenge after a missed day.",
    "unlocked": true,
    "unlockedOnDay": 9
  },
  {
    "id": "halfway-hero",
    "title": "Halfway Hero",
    "description": "Reached Day 30 of the challenge.",
    "unlocked": false,
    "unlockedOnDay": null
  },
  {
    "id": "portfolio-builder",
    "title": "Portfolio Builder",
    "description": "Completed all 60 days and built a full portfolio.",
    "unlocked": false,
    "unlockedOnDay": null
  }
];

export const socialProof: { activeStudents: number; buildsShipped: number; avgCompletionRate: number } = {
  "activeStudents": 4312,
  "buildsShipped": 118450,
  "avgCompletionRate": 62
};

