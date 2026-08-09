import { useEffect, useState } from "react";
import { useReducedMotion } from "./CountUp";

/**
 * Homepage-only entrance moment: a fast terminal boot sequence that plays
 * once per browser session before the hero content reveals. Distinct from
 * TransmissionOverlay (which handles section-to-section switches) — this
 * is specifically the "first thing you see" moment for a new visitor.
 */

const LINES = ["initializing momentum engine...", "loading cohort data...", "ready."];

const SESSION_KEY = "abtalks:boot-seen:v1";

function hasBootedThisSession(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markBooted() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* noop */
  }
}

export function useBootSequence() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (reduced || hasBootedThisSession()) {
      markBooted();
      setChecked(true);
      return;
    }
    setActive(true);
    setChecked(true);
  }, [reduced]);

  const finish = () => {
    markBooted();
    setActive(false);
  };

  return { booting: active, ready: checked, finish };
}

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const line = LINES[lineIndex];
    if (line === undefined) {
      const t = setTimeout(onDone, 180);
      return () => clearTimeout(t);
    }

    if (charCount < line.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 14);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharCount(0);
    }, 90);
    return () => clearTimeout(t);
  }, [lineIndex, charCount, onDone]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[300] grid place-items-center bg-background"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative w-full max-w-[280px] px-6 font-mono text-[13px] leading-relaxed text-momentum">
        {LINES.slice(0, lineIndex).map((l) => (
          <p key={l} className="opacity-70">
            <span className="text-primary">$</span> {l}
          </p>
        ))}
        {lineIndex < LINES.length ? (
          <p>
            <span className="text-primary">$</span> {LINES[lineIndex]!.slice(0, charCount)}
            <span className="animate-momentum-pulse ml-0.5 inline-block h-[13px] w-[7px] translate-y-[1px] bg-momentum" />
          </p>
        ) : null}
      </div>
    </div>
  );
}
