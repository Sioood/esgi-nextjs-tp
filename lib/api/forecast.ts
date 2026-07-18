import { cache } from "react";
import type { WeatherError, WeatherResponse } from "@/lib/types/weather";
import { FORECAST_DAYS, WEATHER_REVALIDATE_SECONDS } from "@/lib/constants";

const FORECAST_BASE = "https://api.open-meteo.com/v1/forecast";

const CURRENT_PARAMS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "weather_code",
  "wind_speed_10m",
  "wind_direction_10m",
  "surface_pressure",
  "uv_index",
  "is_day",
].join(",");

const DAILY_PARAMS = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset",
  "uv_index_max",
  "precipitation_probability_max",
].join(",");

export const getWeather = cache(
  async (latitude: number, longitude: number): Promise<WeatherResponse> => {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      timezone: "auto",
      forecast_days: String(FORECAST_DAYS),
      current: CURRENT_PARAMS,
      daily: DAILY_PARAMS,
    });

    const response = await fetch(`${FORECAST_BASE}?${params}`, {
      next: { revalidate: WEATHER_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      const errorData = (await response.json()) as WeatherError;
      throw new Error(errorData.reason ?? "Échec de la récupération météo");
    }

    return (await response.json()) as WeatherResponse;
  },
);
