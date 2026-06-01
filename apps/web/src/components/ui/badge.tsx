import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "success" | "warning" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
        tone === "neutral" && "border-border bg-muted text-muted-foreground",
        tone === "success" && "border-emerald-200 bg-emerald-50 text-success",
        tone === "warning" && "border-amber-200 bg-amber-50 text-warning",
        tone === "danger" && "border-red-200 bg-red-50 text-danger",
        className
      )}
      {...props}
    />
  );
}
