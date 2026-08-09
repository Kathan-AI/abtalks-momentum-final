import { SCENARIOS, setScenario, type Scenario } from "@/lib/momentum-store";
import { cn } from "@/lib/utils";

export function ScenarioSwitcher({ active }: { active: Scenario }) {
  return (
    <div className="panel p-3">
      <p className="mono-label text-muted-foreground">Preview states</p>
      <p className="mt-1 text-xs leading-snug text-muted-foreground">
        Switch the cohort state to review every edge case without editing data.
      </p>
      <div className="mt-3 grid gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setScenario(s.id)}
            aria-pressed={active === s.id}
            className={cn(
              "min-h-[48px] rounded-xl border px-3 py-2 text-left transition-colors active:scale-[0.99]",
              active === s.id
                ? "border-primary/50 bg-primary/12 text-foreground"
                : "border-border bg-white/[0.02] text-muted-foreground hover:bg-white/[0.06]",
            )}
          >
            <span className="block text-sm font-semibold">{s.label}</span>
            <span className="block text-xs leading-snug opacity-80">{s.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
