import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyCustomerToken } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("customer_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const decoded = verifyCustomerToken(token);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_id", decoded.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
}
