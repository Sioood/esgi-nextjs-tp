import { cn } from "@/lib/utils/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-xs font-semibold text-text-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
