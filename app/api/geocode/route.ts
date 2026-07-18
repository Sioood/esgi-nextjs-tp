import { NextResponse } from "next/server";
import { searchCities } from "@/lib/api/geocoding";
import { SEARCH_MIN_CHARS } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < SEARCH_MIN_CHARS) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchCities(query);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: "Échec de la recherche" },
      { status: 500 },
    );
  }
}
