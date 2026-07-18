export interface OutfitItem {
  id: string;
  label: string;
  icon: string;
}

export interface OutfitInput {
  apparentTemperature: number;
  weatherCode: number;
  windSpeed: number;
  uvIndexMax: number;
  precipitationProbabilityMax: number;
}

export function getOutfitSuggestions(input: OutfitInput): OutfitItem[] {
  const items: OutfitItem[] = [];
  const {
    apparentTemperature,
    weatherCode,
    windSpeed,
    uvIndexMax,
    precipitationProbabilityMax,
  } = input;

  if (apparentTemperature < 5) {
    items.push(
      { id: "coat", label: "Manteau chaud", icon: "🧥" },
      { id: "scarf", label: "Écharpe", icon: "🧣" },
      { id: "gloves", label: "Gants", icon: "🧤" },
    );
  } else if (apparentTemperature < 15) {
    items.push(
      { id: "jacket", label: "Veste", icon: "🧥" },
      { id: "sweater", label: "Pull", icon: "👕" },
    );
  } else if (apparentTemperature < 22) {
    items.push(
      { id: "light", label: "Tenue légère", icon: "👔" },
      { id: "light-jacket", label: "Veste fine (optionnel)", icon: "🧥" },
    );
  } else {
    items.push(
      { id: "tshirt", label: "T-shirt", icon: "👕" },
      { id: "shorts", label: "Short / robe légère", icon: "🩳" },
    );
  }

  if (precipitationProbabilityMax > 50 || isRainCode(weatherCode)) {
    items.push(
      { id: "umbrella", label: "Parapluie", icon: "☂️" },
      { id: "raincoat", label: "Veste imperméable", icon: "🌧️" },
    );
  }

  if (windSpeed > 30) {
    items.push({ id: "windbreaker", label: "Coupe-vent", icon: "💨" });
  }

  if (uvIndexMax >= 6) {
    items.push(
      { id: "sunglasses", label: "Lunettes de soleil", icon: "🕶️" },
      { id: "sunscreen", label: "Crème solaire", icon: "🧴" },
      { id: "hat", label: "Chapeau", icon: "🧢" },
    );
  }

  if (isSnowCode(weatherCode)) {
    items.push(
      { id: "boots", label: "Bottes", icon: "🥾" },
      { id: "waterproof-coat", label: "Manteau imperméable", icon: "🧥" },
    );
  }

  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function isRainCode(code: number): boolean {
  return (code >= 51 && code <= 67) || (code >= 80 && code <= 82);
}

function isSnowCode(code: number): boolean {
  return (code >= 71 && code <= 77) || code === 85 || code === 86;
}

export function buildOutfitInput(weather: {
  current: { apparent_temperature: number; weather_code: number; wind_speed_10m: number };
  daily: { uv_index_max: number[]; precipitation_probability_max: number[] };
}): OutfitInput {
  return {
    apparentTemperature: weather.current.apparent_temperature,
    weatherCode: weather.current.weather_code,
    windSpeed: weather.current.wind_speed_10m,
    uvIndexMax: weather.daily.uv_index_max[0],
    precipitationProbabilityMax: weather.daily.precipitation_probability_max[0],
  };
}
