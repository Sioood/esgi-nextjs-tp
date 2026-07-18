import { cn } from "@/lib/utils/cn";

type StatAccent = "primary" | "secondary" | "tertiary" | "error" | "neutral";

interface StatTileProps {
  label: string;
  value: string;
  icon?: string;
  /** Small trailing note under the value, e.g. wind direction or UV level. */
  hint?: string;
  accent?: StatAccent;
  className?: string;
}

const accentClasses: Record<StatAccent, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  error: "text-error",
  neutral: "text-text-primary",
};

/** Compact metric tile — icon + mono label + accented value. */
export function StatTile({
  label,
  value,
  icon,
  hint,
  accent = "neutral",
  className,
}: StatTileProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-border-subtle bg-background/40 p-3.5 transition-colors hover:border-border-medium",
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        {icon && (
          <span className="text-sm" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          {label}
        </span>
      </div>
      <p
        className={cn(
          "mt-2 font-mono text-lg font-semibold tabular-nums",
          accentClasses[accent],
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-0.5 text-xs text-text-tertiary">{hint}</p>}
    </div>
  );
}
