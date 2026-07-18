import type { CurrentWeather } from "@/lib/types/weather";
import { WindowCard } from "@/components/ui/WindowCard";
import { StatTile } from "@/components/ui/StatTile";
import { STRINGS } from "@/lib/constants";
import {
  formatHumidity,
  formatPressure,
  formatTemperature,
  formatUvIndex,
  formatWindSpeed,
  uvLevel,
  windDirection,
  type SemanticVariant,
} from "@/lib/utils/format";
import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";
import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherCardProps {
  current: CurrentWeather;
  hi: number;
  lo: number;
}

type TileAccent = "primary" | "secondary" | "tertiary" | "error" | "neutral";

const variantToAccent: Record<SemanticVariant, TileAccent> = {
  success: "primary",
  warning: "secondary",
  error: "error",
  info: "tertiary",
};

export function CurrentWeatherCard({ current, hi, lo }: CurrentWeatherCardProps) {
  const weatherInfo = getWeatherCodeInfo(current.weather_code);
  const uv = uvLevel(current.uv_index);

  return (
    <WindowCard
      title="current.weather"
      elevated
      action={
        <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
          {current.is_day ? "☀ jour" : "☾ nuit"}
        </span>
      }
    >
      <div className="flex items-center gap-5">
        <div className="shrink-0 text-6xl drop-shadow-[0_0_16px_rgba(74,222,128,0.25)]">
          <WeatherIcon code={current.weather_code} size="lg" decorative />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-6xl font-bold leading-none text-primary text-glow-primary tabular-nums">
            {formatTemperature(current.temperature_2m)}
          </p>
          <p className="mt-2 text-text-secondary">{weatherInfo.label}</p>
          <p className="mt-1 font-mono text-xs text-text-tertiary tabular-nums">
            ↑ {formatTemperature(hi)} · ↓ {formatTemperature(lo)}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile
          label={STRINGS.feelsLike}
          value={formatTemperature(current.apparent_temperature)}
          icon="🌡️"
        />
        <StatTile
          label={STRINGS.humidity}
          value={formatHumidity(current.relative_humidity_2m)}
          icon="💧"
          accent="tertiary"
        />
        <StatTile
          label={STRINGS.wind}
          value={formatWindSpeed(current.wind_speed_10m)}
          hint={windDirection(current.wind_direction_10m)}
          icon="💨"
        />
        <StatTile
          label={STRINGS.pressure}
          value={formatPressure(current.surface_pressure)}
          icon="📊"
        />
        <StatTile
          label={STRINGS.uvIndex}
          value={formatUvIndex(current.uv_index)}
          hint={uv.label}
          icon="☀️"
          accent={variantToAccent[uv.variant]}
        />
        <StatTile
          label={STRINGS.skyCondition}
          value={weatherInfo.icon}
          hint={weatherInfo.label}
        />
      </dl>
    </WindowCard>
  );
}
