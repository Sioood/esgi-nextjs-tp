"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FavoriteCity } from "@/lib/types/favorites";
import type { WeatherResponse } from "@/lib/types/weather";
import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "@/components/weather/WeatherIcon";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { STRINGS } from "@/lib/constants";
import { cityPath } from "@/lib/utils/city-slug";
import { formatLocation, formatTemperature } from "@/lib/utils/format";
import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";
import { FavoriteButton } from "./FavoriteButton";

function FavoriteWeatherCard({ city }: { city: FavoriteCity }) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const params = new URLSearchParams({
          lat: String(city.latitude),
          lon: String(city.longitude),
        });
        const response = await fetch(`/api/weather?${params}`);
        if (!response.ok) throw new Error();
        const data = (await response.json()) as WeatherResponse;
        if (!cancelled) setWeather(data);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [city.latitude, city.longitude]);

  const skyLabel = weather
    ? getWeatherCodeInfo(weather.current.weather_code).label
    : null;

  return (
    <Card className="relative h-full">
      <div className="absolute right-2 top-2">
        <FavoriteButton city={city} />
      </div>
      <Link href={cityPath(city.id, city.name)} className="block pr-10">
        <p className="font-mono text-sm font-semibold text-text-primary">{city.name}</p>
        <p className="truncate text-xs text-text-tertiary">{formatLocation(city)}</p>

        {weather && (
          <div className="mt-4 flex items-center gap-3">
            <WeatherIcon code={weather.current.weather_code} />
            <div>
              <p className="font-mono text-2xl font-bold text-primary">
                {formatTemperature(weather.current.temperature_2m)}
              </p>
              {skyLabel && (
                <p className="text-xs text-text-secondary">{skyLabel}</p>
              )}
            </div>
          </div>
        )}

        {!weather && !error && (
          <p className="mt-4 text-xs text-text-tertiary">{STRINGS.loading}</p>
        )}

        {error && (
          <p className="mt-4 text-xs text-text-tertiary">Météo indisponible</p>
        )}
      </Link>
    </Card>
  );
}

export function FavoritesList() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return <p className="text-sm text-text-tertiary">{STRINGS.loading}</p>;
  }

  if (favorites.length === 0) {
    return (
      <Card>
        <p className="text-sm text-text-secondary">{STRINGS.favoritesEmpty}</p>
      </Card>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((city) => (
        <li key={city.id}>
          <FavoriteWeatherCard city={city} />
        </li>
      ))}
    </ul>
  );
}
