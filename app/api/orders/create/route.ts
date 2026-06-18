import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyCustomerToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("customer_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const decoded = verifyCustomerToken(token);
    const body = await request.json();
    const { items, total, paymentId, paymentMethod } = body;

    if (!items || !total || !paymentId) {
      return NextResponse.json({ error: "Datos de orden incompletos" }, { status: 400 });
    }

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

    return NextResponse.json({ orderId: order.id, status: "created" });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Error creando la orden" }, { status: 500 });
  }
}
