import { Lock, Trophy } from "lucide-react";
import type { Achievement } from "@/data/cohort";
import { cn } from "@/lib/utils";

export function AchievementGrid({ items, currentDay }: { items: Achievement[]; currentDay?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {items.map((a) => (
        <li
          key={a.id}
          className={cn(
            "rounded-xl border p-3",
            a.unlocked
              ? "border-momentum/30 bg-momentum/8 shadow-[0_0_24px_-16px_var(--momentum)]"
              : "border-border bg-white/[0.02] opacity-70",
          )}
        >
          <span
            className={cn(
              "grid place-items-center rounded-full",
              a.unlocked ? "size-9 bg-momentum/20 text-momentum" : "circle-quiet size-8 bg-white/5 text-muted-foreground",
              a.unlocked && currentDay !== undefined && a.unlockedOnDay === currentDay && "pulse-ring",
            )}
          >
            {a.unlocked ? <Trophy className="size-4" /> : <Lock className="size-4" />}
          </span>
          <p className="mt-2 font-display text-sm font-bold">{a.title}</p>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{a.description}</p>
          {a.unlocked && a.unlockedOnDay ? (
            <p className="mono-label mt-1.5 text-momentum">Day {a.unlockedOnDay}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
