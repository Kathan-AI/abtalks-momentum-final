import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Panel, SectionLabel } from "./Panel";
import { cn } from "@/lib/utils";

/**
 * A simple focus timer scoped to the day's estimated build time.
 * Session-only (no persistence) — it exists to help a late-night student
 * time-box tonight's build, not to track anything long-term.
 */
export function FocusTimer({ estimatedMinutes }: { estimatedMinutes: number }) {
  const totalSeconds = estimatedMinutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const pct = Math.round(((totalSeconds - remaining) / totalSeconds) * 100);
  const done = remaining === 0;

  const reset = () => {
    setRunning(false);
    setRemaining(totalSeconds);
  };

  return (
    <Panel className="mt-4 p-5">
      <SectionLabel>Focus timer</SectionLabel>
      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            if (done) reset();
            else setRunning((r) => !r);
          }}
          aria-label={running ? "Pause timer" : "Start timer"}
          className={cn(
            "circle-touch grid size-16 shrink-0 place-items-center rounded-full border transition-colors active:scale-95",
            running
              ? "pulse-ring border-momentum/40 bg-momentum/15 text-momentum"
              : "circle-quiet border-border bg-white/[0.04] text-foreground",
          )}
        >
          {done ? <RotateCcw className="size-6" /> : running ? <Pause className="size-6" /> : <Play className="ml-0.5 size-6" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className={cn("font-display text-3xl font-bold tabular-nums", done && "text-momentum")}>
            {done ? "Done" : `${mm}:${ss}`}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {done
              ? "Nice focused block. Go log your proof below."
              : running
                ? "Stay on this tab — timer keeps counting while you build."
                : `${estimatedMinutes}m scoped block. Tap play when you start.`}
          </p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-momentum transition-[width] duration-1000 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
