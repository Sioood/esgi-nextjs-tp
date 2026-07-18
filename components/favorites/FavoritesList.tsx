"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { STRINGS } from "@/lib/constants";
import { cityPath } from "@/lib/utils/city-slug";
import { formatLocation } from "@/lib/utils/format";
import { FavoriteButton } from "./FavoriteButton";

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
    <ul className="space-y-2">
      {favorites.map((city) => (
        <li key={city.id}>
          <Card className="flex items-center justify-between gap-2 p-4">
            <Link
              href={cityPath(city.id, city.name)}
              className="min-w-0 flex-1 hover:text-primary transition-colors"
            >
              <p className="font-mono text-sm font-semibold text-text-primary">
                {city.name}
              </p>
              <p className="truncate text-xs text-text-tertiary">
                {formatLocation(city)}
              </p>
            </Link>
            <FavoriteButton city={city} />
          </Card>
        </li>
      ))}
    </ul>
  );
}
