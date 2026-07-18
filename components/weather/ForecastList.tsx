import type { DailyForecast } from "@/lib/types/weather";
import { Card } from "@/components/ui/Card";
import { STRINGS } from "@/lib/constants";
import { formatDate, formatTemperature } from "@/lib/utils/format";
import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";
import { WeatherIcon } from "./WeatherIcon";

interface ForecastListProps {
  daily: DailyForecast;
  timezone: string;
}

export function ForecastList({ daily, timezone }: ForecastListProps) {
  return (
    <Card>
      <h2 className="font-mono text-xl font-semibold">{STRINGS.forecast}</h2>
      <ul className="mt-4 divide-y divide-border-subtle">
        {daily.time.map((date, index) => {
          const code = daily.weather_code[index];
          const info = getWeatherCodeInfo(code);

          return (
            <li
              key={date}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-medium capitalize">
                  {formatDate(date, timezone)}
                </p>
                <p className="text-xs text-text-tertiary">{info.label}</p>
              </div>
              <WeatherIcon code={code} />
              <div className="text-right font-mono text-sm">
                <span className="text-text-primary">
                  {formatTemperature(daily.temperature_2m_max[index])}
                </span>
                <span className="mx-1 text-text-tertiary">/</span>
                <span className="text-text-secondary">
                  {formatTemperature(daily.temperature_2m_min[index])}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
