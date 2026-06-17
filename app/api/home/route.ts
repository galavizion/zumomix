import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("home_sections")
      .select("*")
      .order("section");

    if (error) throw error;

    const sections = data?.reduce(
      (acc, section) => {
        acc[section.section] = section;
        return acc;
      },
      {} as Record<string, any>
    );

    return NextResponse.json(sections);
  } catch (error) {
    console.error("Error fetching home sections:", error);
    return NextResponse.json(
      { error: "Error fetching sections" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { section, content } = await request.json();

    const { data, error } = await supabase
      .from("home_sections")
      .upsert(
        {
          section,
          content,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section" }
      )
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error updating home section:", error);
    return NextResponse.json(
      { error: "Error updating section" },
      { status: 500 }
    );
  }
}
