"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FavoriteCity } from "@/lib/types/favorites";
import type { WeatherResponse } from "@/lib/types/weather";
import { WindowCard } from "@/components/ui/WindowCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { OutfitCard } from "@/components/outfit/OutfitCard";
import { WeatherIcon } from "@/components/weather/WeatherIcon";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { STRINGS } from "@/lib/constants";
import { cityPath } from "@/lib/utils/city-slug";
import { formatLocation, formatTemperature } from "@/lib/utils/format";
import { buildOutfitInput, getOutfitSuggestions } from "@/lib/utils/outfit";
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

  const outfitItems = weather
    ? getOutfitSuggestions(buildOutfitInput(weather))
    : [];

  return (
    <WindowCard
      title={`${city.name.toLowerCase().replace(/\s+/g, "-")}.weather`}
      action={<FavoriteButton city={city} />}
      bodyClassName="p-5"
      className="h-full"
    >
      <Link
        href={cityPath(city.id, city.name)}
        className="block rounded-sm focus-visible:outline-none"
      >
        <p className="truncate font-mono text-sm font-semibold text-text-primary">
          {city.name}
        </p>
        <p className="truncate font-mono text-[11px] text-text-tertiary">
          {formatLocation(city)}
        </p>

        {weather && (
          <>
            <div className="mt-4 flex items-center gap-3">
              <WeatherIcon code={weather.current.weather_code} size="lg" />
              <div className="min-w-0">
                <p className="font-mono text-3xl font-bold text-primary tabular-nums">
                  {formatTemperature(weather.current.temperature_2m)}
                </p>
                {skyLabel && (
                  <p className="truncate text-xs text-text-secondary">
                    {skyLabel}
                  </p>
                )}
              </div>
              <p className="ml-auto shrink-0 text-right font-mono text-xs tabular-nums text-text-tertiary">
                <span className="text-text-secondary">
                  {formatTemperature(weather.daily.temperature_2m_max[0])}
                </span>
                <br />
                {formatTemperature(weather.daily.temperature_2m_min[0])}
              </p>
            </div>

            {outfitItems.length > 0 && <OutfitCard items={outfitItems} compact />}
          </>
        )}

        {!weather && !error && (
          <div className="mt-4 space-y-3" aria-hidden="true">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-3 w-3/4" />
          </div>
        )}

        {error && (
          <p className="mt-4 font-mono text-xs text-text-tertiary">
            <span className="text-error">✗</span> météo indisponible
          </p>
        )}
      </Link>
    </WindowCard>
  );
}

export function FavoritesList() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <li key={i}>
            <Skeleton className="h-48 rounded-md" />
          </li>
        ))}
      </ul>
    );
  }

  if (favorites.length === 0) {
    return (
      <WindowCard title="favorites/empty">
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="text-4xl" aria-hidden="true">
            ⭐
          </span>
          <p className="max-w-sm text-sm text-text-secondary">
            {STRINGS.favoritesEmpty}
          </p>
        </div>
      </WindowCard>
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
