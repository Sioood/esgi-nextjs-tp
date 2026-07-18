const temperatureFormatter = new Intl.NumberFormat("fr-FR", {
  style: "unit",
  unit: "celsius",
  maximumFractionDigits: 0,
});

const windFormatter = new Intl.NumberFormat("fr-FR", {
  style: "unit",
  unit: "kilometer-per-hour",
  maximumFractionDigits: 0,
});

const pressureFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 0,
});

export function formatTemperature(value: number): string {
  return temperatureFormatter.format(value);
}

export function formatWindSpeed(value: number): string {
  return windFormatter.format(value);
}

export function formatPressure(value: number): string {
  return `${pressureFormatter.format(value)} hPa`;
}

export function formatHumidity(value: number): string {
  return percentFormatter.format(value / 100);
}

export function formatUvIndex(value: number): string {
  return value.toFixed(1);
}

export function formatDate(dateStr: string, timezone?: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: timezone,
  }).format(new Date(dateStr));
}

export function formatTime(dateStr: string, timezone?: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(dateStr));
}

export function windDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export type SemanticVariant = "success" | "warning" | "error" | "info";

/** Maps a UV index to a label + semantic variant for coloring. */
export function uvLevel(value: number): { label: string; variant: SemanticVariant } {
  if (value < 3) return { label: "Faible", variant: "success" };
  if (value < 6) return { label: "Modéré", variant: "warning" };
  if (value < 8) return { label: "Élevé", variant: "error" };
  return { label: "Très élevé", variant: "error" };
}

/** Maps a precipitation probability (0–100) to a label + semantic variant. */
export function precipLevel(value: number): {
  label: string;
  variant: SemanticVariant;
} {
  if (value < 20) return { label: "Sec", variant: "success" };
  if (value < 50) return { label: "Averses possibles", variant: "info" };
  if (value < 80) return { label: "Pluie probable", variant: "warning" };
  return { label: "Pluie quasi certaine", variant: "error" };
}

export function formatShortDay(dateStr: string, timezone?: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    timeZone: timezone,
  }).format(new Date(dateStr));
}

export function formatDayMonth(dateStr: string, timezone?: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    timeZone: timezone,
  }).format(new Date(dateStr));
}

export function formatLocation(city: {
  name: string;
  admin1?: string;
  country: string;
}): string {
  const parts = [city.name];
  if (city.admin1) parts.push(city.admin1);
  parts.push(city.country);
  return parts.join(", ");
}
