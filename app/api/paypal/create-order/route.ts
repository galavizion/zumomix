import { NextRequest, NextResponse } from "next/server";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import client from "@/lib/paypal";
import { PRODUCTS } from "@/lib/constants";

interface CartLine {
  productId: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const { items }: { items: CartLine[] } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    // Accumulate in integer cents to avoid floating-point drift
    let serverTotalCents = 0;
    const lineItems: object[] = [];

    for (const { productId, quantity } of items) {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) {
        return NextResponse.json(
          { error: `Producto no encontrado: ${productId}` },
          { status: 400 }
        );
      }
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return NextResponse.json({ error: "Cantidad inválida" }, { status: 400 });
      }

      const unitPrice = product.salePrice ?? product.price;
      const unitCents = Math.round(unitPrice * 100);
      serverTotalCents += unitCents * quantity;
      lineItems.push({
        name: product.name,
        sku: product.sku,
        unit_amount: { currency_code: "MXN", value: (unitCents / 100).toFixed(2) },
        quantity: String(quantity),
      });
    }

    const totalStr = (serverTotalCents / 100).toFixed(2);

    const createOrderRequest = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    createOrderRequest.prefer("return=representation");
    createOrderRequest.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "MXN",
            value: totalStr,
            breakdown: {
              item_total: { currency_code: "MXN", value: totalStr },
            },
          },
          items: lineItems,
        },
      ],
      application_context: {
        brand_name: "Zumomix",
        locale: "es-MX",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/carrito`,
      },
    });

    const response = await client().execute(createOrderRequest);

    return NextResponse.json({
      id: response.result.id,
      status: response.result.status,
    });
  } catch (error) {
    console.error("PayPal create-order error:", error);
    return NextResponse.json(
      { error: "Error creando orden de pago" },
      { status: 500 }
    );
  }
}
