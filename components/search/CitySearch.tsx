"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GeocodingResult } from "@/lib/types/geocoding";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
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

/** Highlights the matched query substring inside a city name. */
function highlightMatch(name: string, query: string) {
  const idx = name.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1 || query.length === 0) return name;
  return (
    <>
      {name.slice(0, idx)}
      <mark className="bg-transparent text-primary">
        {name.slice(idx, idx + query.length)}
      </mark>
      {name.slice(idx + query.length)}
    </>
  );
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

  const trimmed = query.trim();
  const showMinChars = query.length > 0 && trimmed.length < SEARCH_MIN_CHARS;
  const showNoResults =
    isOpen &&
    !isLoading &&
    trimmed.length >= SEARCH_MIN_CHARS &&
    results.length === 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <label
        htmlFor="city-search"
        className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary"
      >
        <span className="text-primary/70">$</span> rechercher une ville
      </label>

      <div className="relative">
        <span
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-primary"
          aria-hidden="true"
        >
          ❯
        </span>
        <input
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
          className={cn(
            "h-12 w-full rounded-md border bg-background pl-9 pr-10 font-mono text-sm text-text-primary transition-all placeholder:text-text-tertiary",
            error
              ? "border-error shadow-[0_0_12px_rgba(248,113,113,0.15)]"
              : "border-border-medium focus:border-primary focus:shadow-[0_0_16px_rgba(74,222,128,0.15)]",
          )}
        />
        {isLoading && (
          <span
            className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-border-strong border-t-primary"
            role="status"
            aria-label={STRINGS.searchLoading}
          />
        )}
      </div>

      {error && (
        <p className="mt-2 text-xs text-error" role="alert">
          {error}
        </p>
      )}
      {showMinChars && (
        <p className="mt-2 font-mono text-xs text-text-tertiary">
          {STRINGS.searchMinChars}
        </p>
      )}
      {showNoResults && (
        <p className="mt-2 font-mono text-xs text-text-tertiary">
          {STRINGS.searchNoResults}
        </p>
      )}

      {isOpen && results.length > 0 && (
        <div
          className="absolute z-40 mt-2 w-full overflow-hidden rounded-md border border-border-medium bg-surface shadow-[0_0_0_1px_rgba(241,245,249,0.06),0_24px_48px_rgba(0,0,0,0.5)]"
        >
          <ul id="city-search-results" role="listbox" className="max-h-80 overflow-y-auto py-1">
            {results.map((city, index) => (
              <li
                key={city.id}
                id={`city-option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={cn(
                  "mx-1 flex items-center rounded-sm transition-colors",
                  index === activeIndex
                    ? "bg-surface-raised"
                    : "hover:bg-surface-raised/60",
                )}
              >
                <Link
                  href={cityPath(city.id, city.name)}
                  className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                >
                  <span className="text-base" aria-hidden="true">
                    📍
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-text-primary">
                      {highlightMatch(city.name, trimmed)}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[11px] text-text-tertiary">
                      {formatLocation(city)}
                    </span>
                  </span>
                </Link>
                <span className="pr-2">
                  <FavoriteButton city={toFavoriteCity(city)} />
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 border-t border-border-subtle px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
            <span>
              <kbd className="text-text-secondary">↑↓</kbd> naviguer
            </span>
            <span>
              <kbd className="text-text-secondary">↵</kbd> ouvrir
            </span>
            <span>
              <kbd className="text-text-secondary">esc</kbd> fermer
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
