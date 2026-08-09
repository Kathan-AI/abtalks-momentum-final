import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  className,
  withNav = true,
}: {
  children: ReactNode;
  className?: string;
  withNav?: boolean;
}) {
  return (
    <div className="app-canvas min-h-screen w-full overflow-x-hidden">
      <div className={cn("mx-auto w-full max-w-md px-4", withNav ? "pt-6 pb-32" : "pt-6 pb-12", className)}>
        {children}
      </div>
      {withNav ? <BottomNav /> : null}
    </div>
  );
}
