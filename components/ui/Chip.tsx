import { cn } from "@/lib/utils/cn";

type ChipVariant = "filter" | "success" | "warning" | "error" | "info";

interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  selected?: boolean;
  className?: string;
}

const variantClasses: Record<ChipVariant, string> = {
  filter:
    "border-border-medium bg-surface font-mono text-xs text-text-secondary",
  success:
    "border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.12)] font-mono text-[11px] font-semibold uppercase text-success",
  warning:
    "border-[rgba(251,191,36,0.25)] bg-[rgba(251,191,36,0.12)] font-mono text-[11px] font-semibold uppercase text-warning",
  error:
    "border-[rgba(248,113,113,0.25)] bg-[rgba(248,113,113,0.12)] font-mono text-[11px] font-semibold uppercase text-error",
  info: "border-[rgba(34,211,238,0.25)] bg-[rgba(34,211,238,0.12)] font-mono text-[11px] font-semibold uppercase text-info",
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
        "inline-flex items-center rounded-sm border px-3 py-1",
        variantClasses[variant],
        selected && variant === "filter" && "border-primary bg-primary text-background",
        className,
      )}
    >
      {children}
    </span>
  );
}
