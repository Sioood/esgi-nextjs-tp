import { cn } from "@/lib/utils/cn";

type OverlineTone = "primary" | "secondary" | "tertiary" | "muted";

interface OverlineProps {
  children: React.ReactNode;
  /** Optional terminal prompt prefix, e.g. "//", ">", "$". */
  prompt?: string;
  tone?: OverlineTone;
  className?: string;
}

const toneClasses: Record<OverlineTone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  muted: "text-text-secondary",
};

/** DevLog overline — JetBrains Mono, 11px, uppercase, wide tracking. */
export function Overline({
  children,
  prompt,
  tone = "muted",
  className,
}: OverlineProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]",
        toneClasses[tone],
        className,
      )}
    >
      {prompt && <span className="text-primary/70">{prompt}</span>}
      {children}
    </span>
  );
}
