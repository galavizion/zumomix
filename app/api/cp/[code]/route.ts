import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  if (!/^\d{5}$/.test(code)) {
    return NextResponse.json({ colonias: [], municipio: "", estado: "" });
  }

  try {
    const token = process.env.COPOMEX_TOKEN ?? "testtest";
    const res = await fetch(
      `https://api.copomex.com/query/info_cp/${code}?token=${token}&type=simplified`,
      { next: { revalidate: 86400 } }
    );
    const data = await res.json();

    if (data.error || !data.response) {
      return NextResponse.json({ colonias: [], municipio: "", estado: "" });
    }

    const r = data.response;
    const colonias: string[] = Array.isArray(r.asentamiento)
      ? r.asentamiento
      : r.asentamiento
      ? [r.asentamiento]
      : [];

    return NextResponse.json({
      colonias,
      municipio: r.municipio ?? "",
      estado: r.estado ?? "",
    });
  } catch {
    return NextResponse.json({ colonias: [], municipio: "", estado: "" });
  }
}
