import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "./CountUp";
import { cn } from "@/lib/utils";

type Variant = "rise" | "slide-left" | "slide-right" | "assemble";

const VARIANT_CLASS: Record<Variant, string> = {
  rise: "reveal-rise",
  "slide-left": "reveal-slide-left",
  "slide-right": "reveal-slide-right",
  assemble: "reveal-assemble",
};

/**
 * Wraps a section of the homepage so it animates in the first time it
 * scrolls into view. Each `variant` gives the section its own distinct
 * entrance language, so scrolling down the page doesn't feel like one
 * repeated fade — different parts of the story arrive differently.
 */
export function ScrollReveal({
  children,
  variant = "rise",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={cn(VARIANT_CLASS[variant], visible && "is-visible", className)}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/**
 * Hook form — for elements that can't be wrapped in a div without
 * breaking markup validity (e.g. <li> directly inside <ul>). Spread the
 * returned props onto the element itself.
 */
export function useScrollReveal(variant: Variant = "rise", delay = 0) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return {
    ref,
    className: cn(VARIANT_CLASS[variant], visible && "is-visible"),
    style: { transitionDelay: visible ? `${delay}ms` : "0ms" } as const,
  };
}
