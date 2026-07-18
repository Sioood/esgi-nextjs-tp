"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GeocodingResult } from "@/lib/types/geocoding";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  SEARCH_DEBOUNCE_MS,
  SEARCH_MIN_CHARS,
  STRINGS,
} from "@/lib/constants";
import { cityPath } from "@/lib/utils/city-slug";
import { toFavoriteCity } from "@/lib/utils/favorites";
import { formatLocation } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface GeocodeApiResponse {
  results?: GeocodingResult[];
  error?: string;
}

export function CitySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchResults = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < SEARCH_MIN_CHARS) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/geocode?q=${encodeURIComponent(searchQuery)}`,
      );
      const data = (await response.json()) as GeocodeApiResponse;

      if (!response.ok) {
        throw new Error(data.error ?? STRINGS.searchError);
      }

      setResults(data.results ?? []);
      setIsOpen(true);
      setActiveIndex(-1);
    } catch {
      setError(STRINGS.searchError);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      void fetchResults(query.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchResults]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const city = results[activeIndex];
      if (city) {
        window.location.href = cityPath(city.id, city.name);
      }
    }
  }

  const showMinChars = query.length > 0 && query.length < SEARCH_MIN_CHARS;
  const showNoResults =
    isOpen && !isLoading && query.length >= SEARCH_MIN_CHARS && results.length === 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <Label htmlFor="city-search">{STRINGS.searchPlaceholder}</Label>
      <Input
        id="city-search"
        type="search"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="city-search-results"
        aria-activedescendant={
          activeIndex >= 0 ? `city-option-${activeIndex}` : undefined
        }
        placeholder={STRINGS.searchPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />

      {isLoading && (
        <p className="mt-2 text-xs text-text-tertiary" role="status">
          {STRINGS.searchLoading}
        </p>
      )}
      {error && (
        <p className="mt-2 text-xs text-error" role="alert">
          {error}
        </p>
      )}
      {showMinChars && (
        <p className="mt-2 text-xs text-text-tertiary">{STRINGS.searchMinChars}</p>
      )}

      {isOpen && results.length > 0 && (
        <ul
          id="city-search-results"
          role="listbox"
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-sm border border-border-medium bg-surface shadow-[0_0_0_1px_rgba(241,245,249,0.06),0_24px_48px_rgba(0,0,0,0.5)]"
        >
          {results.map((city, index) => (
            <li
              key={city.id}
              id={`city-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={cn(
                "flex items-center transition-colors hover:bg-surface-raised",
                index === activeIndex && "bg-surface-raised",
              )}
            >
              <Link
                href={cityPath(city.id, city.name)}
                className="block flex-1 px-4 py-3 text-sm"
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
              >
                <span className="font-medium text-text-primary">{city.name}</span>
                <span className="mt-0.5 block text-xs text-text-tertiary">
                  {formatLocation(city)}
                </span>
              </Link>
              <FavoriteButton city={toFavoriteCity(city)} />
            </li>
          ))}
        </ul>
      )}

      {showNoResults && (
        <p className="mt-2 text-xs text-text-tertiary">{STRINGS.searchNoResults}</p>
      )}
    </div>
  );
}
