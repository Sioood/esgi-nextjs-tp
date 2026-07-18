"use client";

import { FavoritesProvider } from "@/lib/hooks/useFavorites";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
