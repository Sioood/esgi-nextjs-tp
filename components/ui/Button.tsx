import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-background border border-primary hover:bg-[#22c55e] hover:shadow-[0_0_16px_rgba(74,222,128,0.2)] active:bg-[#16a34a]",
  secondary:
    "bg-surface text-text-primary border border-border-medium hover:bg-surface-raised hover:border-border-strong active:bg-border-strong",
  ghost:
    "bg-transparent text-text-secondary border-none hover:bg-surface hover:text-text-primary active:bg-surface-raised",
  destructive:
    "bg-error text-background border border-error hover:bg-[#ef4444] hover:shadow-[0_0_16px_rgba(248,113,113,0.2)] active:bg-[#dc2626]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-7 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-35",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
