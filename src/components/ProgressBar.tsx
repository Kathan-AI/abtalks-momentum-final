import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./CountUp";

export function ProgressBar({
  value,
  className,
  tone = "momentum",
  height = "h-2.5",
}: {
  value: number;
  className?: string;
  tone?: "momentum" | "primary";
  height?: string;
}) {
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (reduced) {
      setWidth(value);
      return;
    }
    const t = setTimeout(() => setWidth(value), 90);
    return () => clearTimeout(t);
  }, [value, reduced]);

  return (
    <div
      className={cn("w-full overflow-hidden rounded-full bg-white/8 ring-1 ring-inset ring-white/10", height, className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-[1100ms] ease-out",
          tone === "momentum"
            ? "bg-[linear-gradient(90deg,var(--primary),var(--momentum))] shadow-[0_0_18px_-2px_var(--momentum)]"
            : "bg-primary shadow-[0_0_18px_-2px_var(--primary)]",
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
