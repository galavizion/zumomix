import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("customer_token")?.value;
    const body = await request.json();
    const { items, total, paymentId, paymentMethod } = body;

    if (!token) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "tu-secret-key"
    ) as any;

    // Crear la orden
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: decoded.id,
        total,
        payment_id: paymentId,
        payment_method: paymentMethod || "paypal",
        status: "confirmado",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Crear los items de la orden
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.name,
      quantity: item.quantity,
      price: item.product.salePrice ?? item.product.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return NextResponse.json({
      orderId: order.id,
      status: "created",
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Error creando la orden" },
      { status: 500 }
    );
  }
}
