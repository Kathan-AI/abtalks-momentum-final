import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { MathRocket } from "./MathRocket";
import { useReducedMotion } from "./CountUp";

const CONCEPTS = ["RAG", "LLM", "LangChain", "Vector DB", "Agents", "MCP", "Transformers", "Embeddings"];

/** Only these count as "major sections" — modals and in-page state don't. */
function sectionOf(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg ?? "home";
}

export function useSection() {
  return useRouterState({ select: (s) => sectionOf(s.location.pathname) });
}

export function TransmissionOverlay() {
  const section = useSection();
  const reduced = useReducedMotion();
  const previous = useRef<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [destination, setDestination] = useState<string>("home");

  useEffect(() => {
    if (previous.current === null) {
      previous.current = section;
      return;
    }
    if (previous.current === section) return;
    previous.current = section;
    if (reduced) return;

    setDestination(section);
    setPlaying(true);
    const t = setTimeout(() => setPlaying(false), 1350);
    return () => clearTimeout(t);
  }, [section, reduced]);

  if (!playing) return null;

  const isHomecoming = destination === "home";

  return (
    <div
      aria-hidden
      className="animate-transmission-fade fixed inset-0 z-[200] overflow-hidden bg-background/92 backdrop-blur-sm"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="absolute inset-0 grid place-items-center">
        <div className={isHomecoming ? "animate-rocket-land relative" : "animate-rocket-launch relative"}>
          <MathRocket />

          {/* flame — only during launch; a landing rocket doesn't need thrust */}
          {!isHomecoming ? (
            <div className="absolute inset-x-0 -bottom-6 flex justify-center">
              <span
                className="animate-flame-flicker block h-16 w-7 origin-top rounded-[50%/30%_30%_70%_70%] blur-[3px]"
                style={{
                  background:
                    "linear-gradient(180deg, var(--momentum), color-mix(in oklab, var(--primary) 70%, transparent), transparent)",
                }}
              />
            </div>
          ) : null}

          {/* concept exhaust trail — only during launch */}
          {!isHomecoming ? (
            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              {CONCEPTS.map((c, i) => (
                <span
                  key={c}
                  className="animate-concept-eject absolute rounded-full border border-momentum/50 bg-momentum/12 px-2 py-0.5 font-mono text-[10px] font-semibold whitespace-nowrap text-momentum shadow-[0_0_16px_-6px_var(--momentum)]"
                  style={
                    {
                      "--dx": `${(i % 2 === 0 ? -1 : 1) * (34 + (i % 4) * 34)}px`,
                      animationDelay: `${140 + i * 55}ms`,
                    } as React.CSSProperties
                  }
                >
                  {c}
                </span>
              ))}
            </div>
          ) : null}

          {/* homecoming label — only when landing back at Home */}
          {isHomecoming ? (
            <div className="animate-homecoming-label absolute inset-x-0 -bottom-10 flex justify-center">
              <span className="mono-label rounded-full border border-momentum/40 bg-momentum/12 px-3 py-1 text-momentum shadow-[0_0_20px_-8px_var(--momentum)]">
                Welcome back to ABTalks
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
