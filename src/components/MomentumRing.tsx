import { cn } from "@/lib/utils";
import { CountUp } from "./CountUp";

/**
 * Momentum ring — a circular gauge that glows/pulses while momentum is alive.
 */
export function MomentumRing({
  score,
  streak,
  size = 132,
  className,
}: {
  score: number;
  streak: number;
  size?: number;
  className?: string;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const active = score > 0;

  return (
    <div
      className={cn("relative shrink-0", active ? "pulse-ring pulse-ring-lg" : "circle-quiet", className)}
      style={{ width: size, height: size }}
    >
      {active && (
        <div
          className="animate-momentum-pulse absolute inset-2 rounded-full blur-xl"
          style={{ background: "color-mix(in oklab, var(--momentum) 35%, transparent)" }}
          aria-hidden
        />
      )}
      <svg width={size} height={size} className="relative -rotate-90">
        <defs>
          <linearGradient id="momentum-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--momentum)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="oklch(1 0 0 / 8%)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#momentum-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
          style={{ transition: "stroke-dashoffset 1200ms cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[2.1rem] leading-none font-bold tracking-tighter">
          <CountUp value={score} />
        </span>
        <span className="mono-label mt-1.5 text-muted-foreground">Momentum</span>
        <span className="mt-1 text-[11px] font-semibold text-momentum">{streak}-day streak</span>
      </div>
    </div>
  );
}
