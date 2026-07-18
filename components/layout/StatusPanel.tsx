import { Container } from "./Container";
import { WindowCard } from "@/components/ui/WindowCard";

type StatusTone = "error" | "warning" | "primary";

interface StatusPanelProps {
  /** Terminal window title, e.g. "error/404". */
  window: string;
  /** Big status code line, e.g. "404" or "500". */
  code: string;
  /** The command echoed above the output, e.g. "meetheo --route /xyz". */
  command?: string;
  title: string;
  message: string;
  tone?: StatusTone;
  children?: React.ReactNode;
}

const toneClasses: Record<StatusTone, string> = {
  error: "text-error",
  warning: "text-warning",
  primary: "text-primary",
};

export function StatusPanel({
  window,
  code,
  command,
  title,
  message,
  tone = "error",
  children,
}: StatusPanelProps) {
  return (
    <Container className="animate-rise py-12 sm:py-20">
      <WindowCard title={window} className="mx-auto max-w-xl" bodyClassName="p-6 sm:p-8">
        {command && (
          <p className="font-mono text-xs text-text-tertiary">
            <span className="text-primary/70">$</span> {command}
          </p>
        )}
        <p className={`mt-2 font-mono text-6xl font-bold ${toneClasses[tone]}`}>
          {code}
        </p>
        <h1 className="mt-4 font-mono text-xl font-semibold text-text-primary">
          <span className={toneClasses[tone]}>✗</span> {title}
        </h1>
        <p className="mt-2 text-sm text-text-secondary">{message}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </WindowCard>
    </Container>
  );
}
