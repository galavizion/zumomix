import { NextRequest, NextResponse } from "next/server";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import client from "@/lib/paypal";

export async function POST(request: NextRequest) {
  try {
    const { orderID } = await request.json();

    if (!orderID) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const captureRequest = new checkoutNodeJssdk.orders.OrdersCaptureRequest(
      orderID
    );
    captureRequest.requestBody({});

    const response = await client().execute(captureRequest);

    if (response.result.status === "COMPLETED") {
      return NextResponse.json({
        id: response.result.id,
        status: response.result.status,
        payer: response.result.payer,
        purchase_units: response.result.purchase_units,
      });
    } else {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json(
      { error: "Error capturing PayPal order" },
      { status: 500 }
    );
  }
}
