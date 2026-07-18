import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";
import { cn } from "@/lib/utils/cn";

interface WeatherIconProps {
  code: number;
  size?: "sm" | "md" | "lg";
  /** When true, the icon is presentational (label conveyed elsewhere). */
  decorative?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-5xl",
};

export function WeatherIcon({
  code,
  size = "sm",
  decorative = false,
  className,
}: WeatherIconProps) {
  const { icon, label } = getWeatherCodeInfo(code);

  return (
    <span
      className={cn(sizeClasses[size], className)}
      role="img"
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
    >
      {icon}
    </span>
  );
}
