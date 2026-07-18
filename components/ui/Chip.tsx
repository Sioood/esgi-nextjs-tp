import { cn } from "@/lib/utils/cn";

type ChipVariant = "filter" | "soft" | "success" | "warning" | "error" | "info";

interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  selected?: boolean;
  className?: string;
}

const statusBase =
  "font-mono text-[11px] font-semibold uppercase tracking-[0.06em]";

const variantClasses: Record<ChipVariant, string> = {
  filter:
    "border-border-medium bg-surface font-mono text-xs font-medium text-text-secondary",
  soft: "border-border-medium bg-background/50 font-mono text-xs font-medium text-text-primary",
  success: `border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.12)] text-success ${statusBase}`,
  warning: `border-[rgba(251,191,36,0.25)] bg-[rgba(251,191,36,0.12)] text-warning ${statusBase}`,
  error: `border-[rgba(248,113,113,0.25)] bg-[rgba(248,113,113,0.12)] text-error ${statusBase}`,
  info: `border-[rgba(34,211,238,0.25)] bg-[rgba(34,211,238,0.12)] text-info ${statusBase}`,
};

export function Chip({
  children,
  variant = "filter",
  selected = false,
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-2.5 py-1",
        variantClasses[variant],
        selected &&
          variant === "filter" &&
          "border-primary bg-primary text-background",
        className,
      )}
    >
      {children}
    </span>
  );
}
