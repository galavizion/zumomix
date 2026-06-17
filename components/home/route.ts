import { google } from "googleapis";
import { NextResponse } from "next/server";

type Review = {
  reviewer: {
    profilePhotoUrl: string;
    displayName: string;
  };
  starRating: string;
  comment: string;
  createTime: string;
};

// Una caché simple en memoria para no llamar a la API de Google en cada petición.
let cachedReviews: Review[] | null = null;
let lastFetchTime: number | null = null;

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 horas

export async function GET() {
  const now = Date.now();

  // Si tenemos reseñas en caché y no ha pasado el tiempo de duración, las devolvemos.
  if (cachedReviews && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedReviews);
  }

  try {
    const mybusiness = google.mybusinessbusinessinformation({
      version: "v1",
      auth: process.env.GOOGLE_API_KEY,
    });

    const accountId = process.env.GOOGLE_ACCOUNT_ID;
    const locationId = process.env.GOOGLE_LOCATION_ID;

    if (!accountId || !locationId) {
      throw new Error("Google Account ID o Location ID no están configurados.");
    }

    const res = await mybusiness.accounts.locations.reviews.list({
      parent: `accounts/${accountId}/locations/${locationId}`,
      pageSize: 10, // Traer las 10 reseñas más recientes
      orderBy: "updateTime desc",
    });

    const reviews = (res.data.reviews || []).filter(r => r.comment); // Solo reseñas con comentario

    // Actualizamos la caché
    cachedReviews = reviews as Review[];
    lastFetchTime = now;

    return NextResponse.json(cachedReviews);
  } catch (error) {
    console.error("Error al obtener reseñas de Google:", error);
    return NextResponse.json({ error: "No se pudieron obtener las reseñas." }, { status: 500 });
  }
}