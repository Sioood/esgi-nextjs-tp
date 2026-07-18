import { cn } from "@/lib/utils/cn";

interface WindowCardProps {
  children: React.ReactNode;
  /** Mono title shown in the terminal-style title bar, e.g. "paris.weather". */
  title?: string;
  /** Optional right-aligned node in the title bar (badge, status…). */
  action?: React.ReactNode;
  elevated?: boolean;
  className?: string;
  bodyClassName?: string;
}

/**
 * Terminal-window card: a title bar with traffic-light dots and a mono
 * caption, over a DevLog surface panel. The signature MeeThéo container.
 */
export function WindowCard({
  children,
  title,
  action,
  elevated = false,
  className,
  bodyClassName,
}: WindowCardProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-md border bg-surface transition-colors",
        elevated
          ? "border-border-strong glow-medium"
          : "border-border-medium hover:border-border-strong",
        className,
      )}
    >
      <header className="flex items-center gap-3 border-b border-border-subtle bg-background/40 px-4 py-2.5">
        <span className="window-dots" aria-hidden="true">
          <span className="bg-error/70" />
          <span className="bg-secondary/70" />
          <span className="bg-primary/70" />
        </span>
        {title && (
          <span className="truncate font-mono text-xs text-text-tertiary">
            {title}
          </span>
        )}
        {action && <span className="ml-auto flex items-center">{action}</span>}
      </header>
      <div className={cn("p-6", bodyClassName)}>{children}</div>
    </section>
  );
}
