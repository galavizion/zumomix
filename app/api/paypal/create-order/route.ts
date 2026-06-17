import { NextRequest, NextResponse } from "next/server";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import client from "@/lib/paypal";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, total } = body;

    const request_body = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "MXN",
            value: total.toString(),
            breakdown: {
              item_total: {
                currency_code: "MXN",
                value: total.toString(),
              },
            },
          },
          items: items.map((item: any) => ({
            name: item.product.name,
            sku: item.product.sku,
            unit_amount: {
              currency_code: "MXN",
              value: (item.product.salePrice ?? item.product.price).toString(),
            },
            quantity: item.quantity.toString(),
          })),
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
    };

    const createOrderRequest = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    createOrderRequest.prefer("return=representation");
    createOrderRequest.requestBody(request_body);

    const response = await client().execute(createOrderRequest);

    return NextResponse.json({
      id: response.result.id,
      status: response.result.status,
    });
  } catch (error) {
    console.error("PayPal error:", error);
    return NextResponse.json(
      { error: "Error creating PayPal order" },
      { status: 500 }
    );
  }
}
