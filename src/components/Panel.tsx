import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  glass,
  ...rest
}: { children: ReactNode; className?: string; glass?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(glass ? "panel-glass" : "panel", "p-4", className)} {...rest}>
      {children}
    </div>
  );
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mono-label text-muted-foreground", className)}>{children}</p>;
}
