import type { DailyForecast } from "@/lib/types/weather";
import { WindowCard } from "@/components/ui/WindowCard";
import { RangeBar } from "@/components/ui/RangeBar";
import {
  formatDayMonth,
  formatShortDay,
  formatTemperature,
} from "@/lib/utils/format";
import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";
import { WeatherIcon } from "./WeatherIcon";

interface ForecastListProps {
  daily: DailyForecast;
  timezone: string;
}

export function ForecastList({ daily, timezone }: ForecastListProps) {
  const weekMin = Math.min(...daily.temperature_2m_min);
  const weekMax = Math.max(...daily.temperature_2m_max);

  return (
    <WindowCard title="forecast.7d" bodyClassName="p-2 sm:p-3">
      <ul>
        {daily.time.map((date, index) => {
          const code = daily.weather_code[index];
          const info = getWeatherCodeInfo(code);
          const min = daily.temperature_2m_min[index];
          const max = daily.temperature_2m_max[index];
          const precip = daily.precipitation_probability_max[index];
          const isToday = index === 0;

          return (
            <li
              key={date}
              className="grid grid-cols-[3.5rem_2rem_1fr_auto] items-center gap-3 rounded-sm px-2 py-3 transition-colors hover:bg-surface-raised/40 sm:grid-cols-[5rem_2.5rem_1fr_auto] sm:gap-4"
            >
              <div className="min-w-0">
                <p className="font-mono text-sm font-semibold capitalize text-text-primary">
                  {isToday ? "Auj." : formatShortDay(date, timezone)}
                </p>
                <p className="font-mono text-[11px] text-text-tertiary">
                  {formatDayMonth(date, timezone)}
                </p>
              </div>

              <div className="flex items-center justify-center" title={info.label}>
                <WeatherIcon code={code} size="md" />
              </div>

              <div className="flex min-w-0 flex-col gap-1.5">
                <RangeBar
                  min={min}
                  max={max}
                  scaleMin={weekMin}
                  scaleMax={weekMax}
                />
                {precip >= 20 && (
                  <span className="font-mono text-[10px] text-tertiary">
                    💧 {precip}%
                  </span>
                )}
              </div>

              <div className="text-right font-mono text-sm tabular-nums">
                <span className="font-semibold text-text-primary">
                  {formatTemperature(max)}
                </span>
                <span className="mx-1 text-border-strong">/</span>
                <span className="text-text-tertiary">
                  {formatTemperature(min)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </WindowCard>
  );
}
