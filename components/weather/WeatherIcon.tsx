import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";

interface WeatherIconProps {
  code: number;
  size?: "sm" | "lg";
}

export function WeatherIcon({ code, size = "sm" }: WeatherIconProps) {
  const { icon, label } = getWeatherCodeInfo(code);

  return (
    <span
      className={size === "lg" ? "text-5xl" : "text-2xl"}
      role="img"
      aria-label={label}
    >
      {icon}
    </span>
  );
}
