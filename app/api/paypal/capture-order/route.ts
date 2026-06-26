import { NextRequest, NextResponse } from "next/server";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import client from "@/lib/paypal";
import { supabaseAdmin } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/constants";
import { verifyCustomerToken } from "@/lib/jwt";

interface CartLine {
  productId: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const { orderID, items }: { orderID: string; items: CartLine[] } =
      await request.json();

    if (!orderID) {
      return NextResponse.json({ error: "Order ID requerido" }, { status: 400 });
    }

    // 1. Guard against double-capture: reject if this paypal orderID already exists
    const { data: existing } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("payment_id", orderID)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "Orden ya procesada" }, { status: 409 });
    }

    // 2. Capture the payment with PayPal — this is authoritative
    const captureRequest = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    captureRequest.requestBody({});
    const response = await client().execute(captureRequest);

    if (response.result.status !== "COMPLETED") {
      return NextResponse.json({ error: "Pago no completado" }, { status: 400 });
    }

    // 3. Use the amount PayPal captured — never trust the client for this
    const capturedAmount = parseFloat(
      response.result.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? "0"
    );

    if (!capturedAmount || capturedAmount <= 0) {
      return NextResponse.json({ error: "Monto capturado inválido" }, { status: 400 });
    }

    // 4. Identify customer if logged in (optional — guest checkout allowed)
    let customerId: string | null = null;
    const token = request.cookies.get("customer_token")?.value;
    if (token) {
      try {
        const decoded = verifyCustomerToken(token);
        customerId = decoded.id;
      } catch {
        // guest checkout — no customer linked
      }
    }

    // 5. Create the order record using verified data
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_id: customerId,
        total: capturedAmount,
        payment_id: orderID,
        payment_method: "paypal",
        status: "confirmado",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 6. Create order items using server-side prices from PRODUCTS
    if (Array.isArray(items) && items.length > 0) {
      const orderItems = items
        .map(({ productId, quantity }) => {
          const product = PRODUCTS.find((p) => p.id === productId);
          if (!product) return null;
          return {
            order_id: order.id,
            product_id: productId,
            product_name: product.name,
            quantity,
            price: product.salePrice ?? product.price,
          };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);

      if (orderItems.length > 0) {
        const { error: itemsError } = await supabaseAdmin
          .from("order_items")
          .insert(orderItems);
        if (itemsError) console.error("Error guardando items:", itemsError);
      }
    }

    return NextResponse.json({
      id: order.id,
      paypalOrderId: orderID,
      status: "COMPLETED",
      total: capturedAmount,
    });
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json(
      { error: "Error procesando el pago" },
      { status: 500 }
    );
  }
}
