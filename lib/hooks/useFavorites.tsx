"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FavoriteCity } from "@/lib/types/favorites";
import { FAVORITES_STORAGE_KEY } from "@/lib/constants";

export interface FavoritesContextValue {
  favorites: FavoriteCity[];
  isLoaded: boolean;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (city: FavoriteCity) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function readFavorites(): FavoriteCity[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as FavoriteCity[];
  } catch {
    return [];
  }
}

function writeFavorites(favorites: FavoriteCity[]): void {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync avec localStorage au montage
    setFavorites(readFavorites());
    setIsLoaded(true);
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((f) => f.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback((city: FavoriteCity) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === city.id);
      const next = exists
        ? prev.filter((f) => f.id !== city.id)
        : [...prev, city];
      writeFavorites(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ favorites, isLoaded, isFavorite, toggleFavorite }),
    [favorites, isLoaded, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
