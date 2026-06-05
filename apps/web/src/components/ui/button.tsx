import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-55",
        variant === "primary" &&
          "bg-accent text-accent-foreground hover:bg-teal-700",
        variant === "secondary" &&
          "border border-border bg-surface text-foreground hover:bg-muted",
        variant === "ghost" && "text-foreground hover:bg-muted",
        className
      )}
      type={type}
      {...props}
    />
  );
}
