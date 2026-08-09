import { Github, Linkedin, Rocket, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Submission } from "@/data/cohort";

const PROOFS = [
  { key: "githubRepoUrl", label: "GitHub repo", Icon: Github },
  { key: "githubCommitUrl", label: "Commit", Icon: Check },
  { key: "linkedinPostUrl", label: "LinkedIn post", Icon: Linkedin },
  { key: "liveDeploymentUrl", label: "Live deploy", Icon: Rocket },
] as const;

export function ProofStatus({
  submission,
  compact,
}: {
  submission: Submission | null;
  compact?: boolean;
}) {
  return (
    <ul className={cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-1")}>
      {PROOFS.map(({ key, label, Icon }) => {
        const url = submission?.[key] ?? "";
        const done = Boolean(url);
        const content = (
          <>
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-lg",
                done ? "bg-momentum/15 text-momentum glow-momentum" : "bg-white/5 text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{label}</span>
              <span className={cn("block truncate text-xs", done ? "text-momentum" : "text-muted-foreground")}>
                {done ? (compact ? "Verified" : url.replace(/^https?:\/\//, "")) : "Not shared yet"}
              </span>
            </span>
            {!compact &&
              (done ? (
                <Check className="size-4 shrink-0 text-momentum" />
              ) : (
                <Circle className="size-4 shrink-0 text-muted-foreground/60" />
              ))}
          </>
        );

        return (
          <li key={key}>
            {done ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-white/[0.03] p-2.5 transition-colors hover:bg-white/[0.07]"
              >
                {content}
              </a>
            ) : (
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-dashed border-border/80 p-2.5">
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
