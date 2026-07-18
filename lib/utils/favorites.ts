import type { GeocodingResult } from "@/lib/types/geocoding";
import type { FavoriteCity } from "@/lib/types/favorites";

export function toFavoriteCity(city: GeocodingResult): FavoriteCity {
  return {
    id: city.id,
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    country: city.country,
    admin1: city.admin1,
  };
}
