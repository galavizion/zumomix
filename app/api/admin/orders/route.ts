import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdminToken, unauthorizedResponse } from "@/lib/adminAuth";

const VALID_STATUSES = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"] as const;

export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        customers:customer_id (nombre, email, telefono)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Error obteniendo órdenes" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", orderId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: "Error actualizando orden" },
      { status: 500 }
    );
  }
}
