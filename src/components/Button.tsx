import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-display font-bold tracking-tight transition-all duration-150 select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.975]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_10px_28px_-12px_var(--primary)] hover:brightness-110 active:brightness-95",
        momentum:
          "bg-momentum text-momentum-foreground shadow-[0_10px_28px_-12px_var(--momentum)] hover:brightness-110 active:brightness-95",
        outline:
          "border border-border bg-white/[0.03] text-foreground hover:bg-white/[0.07] active:bg-white/[0.1]",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]",
      },
      size: {
        lg: "min-h-[52px] px-6 text-base w-full",
        md: "min-h-[48px] px-5 text-sm",
        sm: "min-h-[40px] px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
