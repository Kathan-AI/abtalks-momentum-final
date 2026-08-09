import { CheckCircle2, AlertTriangle, Trophy } from "lucide-react";
import type { ActivityItem } from "@/data/cohort";
import { cn } from "@/lib/utils";

const MAP = {
  submission: { Icon: CheckCircle2, tone: "text-momentum bg-momentum/12" },
  missed: { Icon: AlertTriangle, tone: "text-warn bg-warn/12" },
  achievement: { Icon: Trophy, tone: "text-primary bg-primary/15" },
} as const;

function when(ts: string) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) +
    " · " +
    d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
}

export function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
        No activity yet. Your first submission will show up here tonight.
      </p>
    );
  }

  return (
    <ol className="relative space-y-4 pl-6">
      <span className="absolute top-2 bottom-2 left-[11px] w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
      {items.slice(0, 6).map((item, i) => {
        const { Icon, tone } = MAP[item.type];
        return (
          <li key={`${item.day}-${item.type}-${i}`} className="relative">
            <span
              className={cn(
                "absolute top-0.5 -left-6 grid size-[22px] place-items-center rounded-full ring-4 ring-background",
                tone,
                i === 0 ? "pulse-ring" : "circle-quiet",
              )}
            >
              <Icon className="size-3.5" />
            </span>
            <p className="text-sm leading-snug font-medium">{item.message}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{when(item.timestamp)}</p>
          </li>
        );
      })}
    </ol>
  );
}
