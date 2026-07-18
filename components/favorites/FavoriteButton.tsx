"use client";

import type { FavoriteCity } from "@/lib/types/favorites";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { STRINGS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

interface FavoriteButtonProps {
  city: FavoriteCity;
  className?: string;
}

export function FavoriteButton({ city, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const active = isLoaded && isFavorite(city.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(city);
      }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-sm p-2 transition-colors hover:bg-surface-raised",
        className,
      )}
      aria-label={active ? STRINGS.removeFavorite : STRINGS.addFavorite}
      aria-pressed={active}
      title={active ? STRINGS.removeFavorite : STRINGS.addFavorite}
    >
      <span
        className={cn(
          "text-xl transition-all duration-200 hover:scale-110",
          active
            ? "text-secondary [text-shadow:0_0_12px_rgba(251,191,36,0.5)]"
            : "text-text-tertiary hover:text-secondary",
        )}
      >
        {active ? "★" : "☆"}
      </span>
    </button>
  );
}
