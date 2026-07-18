import type {
  GeocodingError,
  GeocodingResponse,
  GeocodingResult,
} from "@/lib/types/geocoding";
import { SEARCH_RESULTS_COUNT } from "@/lib/constants";

const GEOCODING_BASE = "https://geocoding-api.open-meteo.com/v1";

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  const params = new URLSearchParams({
    name: query,
    count: String(SEARCH_RESULTS_COUNT),
    language: "fr",
  });

  const response = await fetch(`${GEOCODING_BASE}/search?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorData = (await response.json()) as GeocodingError;
    throw new Error(errorData.reason ?? "Échec de la recherche de villes");
  }

  const data = (await response.json()) as GeocodingResponse;
  return data.results ?? [];
}

export async function getCityById(id: number): Promise<GeocodingResult | null> {
  const response = await fetch(`${GEOCODING_BASE}/get?id=${id}`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as GeocodingResult;
  return data.id ? data : null;
}
