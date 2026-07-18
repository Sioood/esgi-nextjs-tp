import { NextResponse } from "next/server";
import { getWeather } from "@/lib/api/forecast";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Coordonnées manquantes" }, { status: 400 });
  }

  const latitude = Number(lat);
  const longitude = Number(lon);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return NextResponse.json({ error: "Coordonnées invalides" }, { status: 400 });
  }

  try {
    const weather = await getWeather(latitude, longitude);
    return NextResponse.json(weather);
  } catch {
    return NextResponse.json(
      { error: "Échec de la récupération météo" },
      { status: 500 },
    );
  }
}
