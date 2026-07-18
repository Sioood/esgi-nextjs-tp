import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export function Card({ children, className, elevated = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-border-medium bg-surface p-6",
        elevated
          ? "border-border-strong shadow-[0_0_16px_rgba(74,222,128,0.12)]"
          : "hover:border-border-strong hover:shadow-[0_0_8px_rgba(74,222,128,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
