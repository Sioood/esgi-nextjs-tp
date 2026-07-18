export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toCitySlug(id: number, name: string): string {
  return `${id}-${slugify(name)}`;
}

export function parseCitySlug(citySlug: string): { id: number; slug: string } | null {
  const match = citySlug.match(/^(\d+)-(.+)$/);
  if (!match) return null;

  const id = Number(match[1]);
  if (Number.isNaN(id)) return null;

  return { id, slug: match[2] };
}

export function cityPath(id: number, name: string): string {
  return `/ville/${toCitySlug(id, name)}`;
}

export function osmMapUrl(latitude: number, longitude: number): string {
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=12/${latitude}/${longitude}`;
}
