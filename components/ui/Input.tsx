import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-sm border bg-background px-3.5 py-2 text-sm text-text-primary transition-colors placeholder:text-text-tertiary",
        error
          ? "border-error shadow-[0_0_12px_rgba(248,113,113,0.15)]"
          : "border-border-medium focus:border-primary focus:shadow-[0_0_12px_rgba(74,222,128,0.15)]",
        "disabled:bg-surface disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}
