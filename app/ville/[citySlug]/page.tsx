import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityById } from "@/lib/api/geocoding";
import { getWeather } from "@/lib/api/forecast";
import { Container } from "@/components/layout/Container";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { ForecastList } from "@/components/weather/ForecastList";
import { SunTimes } from "@/components/weather/SunTimes";
import { OutfitCard } from "@/components/outfit/OutfitCard";
import { Chip } from "@/components/ui/Chip";
import { STRINGS } from "@/lib/constants";
import { parseCitySlug, osmMapUrl } from "@/lib/utils/city-slug";
import { formatLocation, precipLevel } from "@/lib/utils/format";
import { buildOutfitInput, getOutfitSuggestions } from "@/lib/utils/outfit";
import { getWeatherCodeInfo } from "@/lib/utils/weather-codes";

interface CityPageProps {
  params: Promise<{ citySlug: string }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { citySlug } = await params;
  const parsed = parseCitySlug(citySlug);
  if (!parsed) return { title: STRINGS.cityNotFoundTitle };

  const city = await getCityById(parsed.id);
  if (!city) return { title: STRINGS.cityNotFoundTitle };

  return {
    title: city.name,
    description: `Météo et prévisions pour ${formatLocation(city)}`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { citySlug } = await params;
  const parsed = parseCitySlug(citySlug);

  if (!parsed) notFound();

  const city = await getCityById(parsed.id);
  if (!city) notFound();

  const weather = await getWeather(city.latitude, city.longitude);

  const outfitItems = getOutfitSuggestions(buildOutfitInput(weather));
  const sky = getWeatherCodeInfo(weather.current.weather_code);
  const precip = precipLevel(weather.daily.precipitation_probability_max[0]);

  const favoriteCity = {
    id: city.id,
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    country: city.country,
    admin1: city.admin1,
  };

  return (
    <Container className="animate-rise space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-sm font-mono text-xs text-text-tertiary transition-colors hover:text-primary"
        >
          <span aria-hidden="true">←</span> {STRINGS.backHome}
        </Link>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
              {city.name}
            </h1>
            <p className="mt-1 truncate font-mono text-sm text-text-secondary">
              📍 {formatLocation(city)}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Chip variant="soft">
                <span aria-hidden="true">{sky.icon}</span> {sky.label}
              </Chip>
              <Chip variant={precip.variant}>{precip.label}</Chip>
            </div>
          </div>
          <div className="shrink-0 rounded-sm border border-border-medium bg-surface">
            <FavoriteButton city={favoriteCity} />
          </div>
        </div>
      </div>

      <CurrentWeatherCard
        current={weather.current}
        hi={weather.daily.temperature_2m_max[0]}
        lo={weather.daily.temperature_2m_min[0]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ForecastList daily={weather.daily} timezone={weather.timezone} />
        </div>

        <div className="space-y-6">
          <OutfitCard items={outfitItems} />
          <SunTimes
            sunrise={weather.daily.sunrise[0]}
            sunset={weather.daily.sunset[0]}
            timezone={weather.timezone}
          />
          <a
            href={osmMapUrl(city.latitude, city.longitude)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-border-medium bg-surface px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border-strong hover:bg-surface-raised"
          >
            <span aria-hidden="true">🗺️</span> {STRINGS.viewOnMap}
          </a>
        </div>
      </div>
    </Container>
  );
}
