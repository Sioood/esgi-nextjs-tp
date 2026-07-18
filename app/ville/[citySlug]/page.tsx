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
import { STRINGS } from "@/lib/constants";
import { parseCitySlug, osmMapUrl } from "@/lib/utils/city-slug";
import { formatLocation } from "@/lib/utils/format";
import { buildOutfitInput, getOutfitSuggestions } from "@/lib/utils/outfit";

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
    title: `${city.name} — MeeThéo`,
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

  const favoriteCity = {
    id: city.id,
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    country: city.country,
    admin1: city.admin1,
  };

  return (
    <Container className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/"
            className="text-sm text-info transition-colors hover:text-primary"
          >
            ← {STRINGS.backHome}
          </Link>
          <h1 className="mt-2 font-mono text-3xl font-bold sm:text-4xl">{city.name}</h1>
          <p className="mt-1 text-text-secondary">{formatLocation(city)}</p>
        </div>
        <FavoriteButton city={favoriteCity} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CurrentWeatherCard current={weather.current} />
        <OutfitCard items={outfitItems} />
      </div>

      <ForecastList daily={weather.daily} timezone={weather.timezone} />

      <div className="grid gap-6 sm:grid-cols-2">
        <SunTimes
          sunrise={weather.daily.sunrise[0]}
          sunset={weather.daily.sunset[0]}
          timezone={weather.timezone}
        />
        <div className="flex items-end">
          <a
            href={osmMapUrl(city.latitude, city.longitude)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-border-medium bg-surface px-7 py-3 text-base font-semibold text-text-primary transition-colors hover:border-border-strong hover:bg-surface-raised"
          >
            {STRINGS.viewOnMap}
          </a>
        </div>
      </div>
    </Container>
  );
}
