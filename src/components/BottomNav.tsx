import { Link, useRouterState } from "@tanstack/react-router";
import { Home, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/dashboard", label: "Home", Icon: Home },
  { to: "/progress", label: "Progress", Icon: TrendingUp },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/80 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-3 py-2">
        {ITEMS.map(({ to, label, Icon }) => {
          const active = pathname === to || (to === "/dashboard" && pathname.startsWith("/day"));
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl transition-colors active:bg-white/8",
                  active ? "text-momentum" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "circle-touch grid place-items-center rounded-full transition-all",
                    active
                      ? "pulse-ring size-9 bg-momentum/20 text-momentum"
                      : "circle-quiet size-8 bg-white/[0.04]",
                  )}
                >
                  <Icon className="size-[18px]" />
                </span>
                <span className="text-[11px] font-semibold">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
