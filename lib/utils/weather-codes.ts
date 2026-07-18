export interface WeatherCodeInfo {
  label: string;
  icon: string;
}

const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: { label: "Ciel dégagé", icon: "☀️" },
  1: { label: "Principalement dégagé", icon: "🌤️" },
  2: { label: "Partiellement nuageux", icon: "⛅" },
  3: { label: "Couvert", icon: "☁️" },
  45: { label: "Brouillard", icon: "🌫️" },
  48: { label: "Brouillard givrant", icon: "🌫️" },
  51: { label: "Bruine légère", icon: "🌦️" },
  53: { label: "Bruine modérée", icon: "🌦️" },
  55: { label: "Bruine dense", icon: "🌦️" },
  56: { label: "Bruine verglaçante légère", icon: "🌧️" },
  57: { label: "Bruine verglaçante dense", icon: "🌧️" },
  61: { label: "Pluie légère", icon: "🌧️" },
  63: { label: "Pluie modérée", icon: "🌧️" },
  65: { label: "Pluie forte", icon: "🌧️" },
  66: { label: "Pluie verglaçante légère", icon: "🌨️" },
  67: { label: "Pluie verglaçante forte", icon: "🌨️" },
  71: { label: "Neige légère", icon: "🌨️" },
  73: { label: "Neige modérée", icon: "❄️" },
  75: { label: "Neige forte", icon: "❄️" },
  77: { label: "Grains de neige", icon: "❄️" },
  80: { label: "Averses légères", icon: "🌦️" },
  81: { label: "Averses modérées", icon: "🌧️" },
  82: { label: "Averses violentes", icon: "⛈️" },
  85: { label: "Averses de neige légères", icon: "🌨️" },
  86: { label: "Averses de neige fortes", icon: "❄️" },
  95: { label: "Orage", icon: "⛈️" },
  96: { label: "Orage avec grêle légère", icon: "⛈️" },
  99: { label: "Orage avec grêle forte", icon: "⛈️" },
};

const DEFAULT_WEATHER: WeatherCodeInfo = {
  label: "Conditions inconnues",
  icon: "🌡️",
};

export function getWeatherCodeInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODES[code] ?? DEFAULT_WEATHER;
}

export function isRainCode(code: number): boolean {
  return (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82) ||
    code === 95 ||
    code === 96 ||
    code === 99
  );
}

export function isSnowCode(code: number): boolean {
  return (code >= 71 && code <= 77) || code === 85 || code === 86;
}
