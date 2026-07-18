import type { CurrentWeather } from "@/lib/types/weather";
import { Card } from "@/components/ui/Card";
import { STRINGS } from "@/lib/constants";
import {
  formatHumidity,
  formatPressure,
  formatTemperature,
  formatUvIndex,
  formatWindSpeed,
  windDirection,
} from "@/lib/utils/format";
import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";
import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherCardProps {
  current: CurrentWeather;
}

export function CurrentWeatherCard({ current }: CurrentWeatherCardProps) {
  const weatherInfo = getWeatherCodeInfo(current.weather_code);

  const stats = [
    { label: STRINGS.feelsLike, value: formatTemperature(current.apparent_temperature) },
    { label: STRINGS.humidity, value: formatHumidity(current.relative_humidity_2m) },
    { label: STRINGS.pressure, value: formatPressure(current.surface_pressure) },
    {
      label: STRINGS.wind,
      value: `${formatWindSpeed(current.wind_speed_10m)} ${windDirection(current.wind_direction_10m)}`,
    },
    { label: STRINGS.uvIndex, value: formatUvIndex(current.uv_index) },
    { label: STRINGS.skyCondition, value: weatherInfo.label },
  ];

  return (
    <Card elevated>
      <h2 className="font-mono text-xl font-semibold">{STRINGS.currentWeather}</h2>
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <WeatherIcon code={current.weather_code} size="lg" />
        <div className="text-center sm:text-left">
          <p className="font-mono text-5xl font-bold text-primary">
            {formatTemperature(current.temperature_2m)}
          </p>
          <p className="mt-1 text-text-secondary">{weatherInfo.label}</p>
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs font-semibold text-text-secondary">{stat.label}</dt>
            <dd className="mt-1 text-sm text-text-primary">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
