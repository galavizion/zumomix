"use client";

import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

interface PayPalButtonProps {
  disabled?: boolean;
}

export default function PayPalButton({ disabled = false }: PayPalButtonProps) {
  const { items, total } = useCart();
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=MXN`;
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: async (data: any, actions: any) => {
              try {
                const response = await fetch("/api/paypal/create-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    items,
                    total,
                  }),
                });

                const orderData = await response.json();
                return orderData.id;
              } catch (error) {
                console.error("Error creating order:", error);
                alert("Error al crear la orden de pago");
              }
            },
            onApprove: async (data: any, actions: any) => {
              try {
                const response = await fetch("/api/paypal/capture-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                });

                const orderData = await response.json();

                if (orderData.status === "COMPLETED") {
                  router.push(
                    `/checkout/success?orderId=${orderData.id}`
                  );
                } else {
                  alert("El pago no se completó");
                }
              } catch (error) {
                console.error("Error capturing order:", error);
                alert("Error al procesar el pago");
              }
            },
            onError: (err: any) => {
              console.error("PayPal error:", err);
              alert("Error con PayPal");
            },
          })
          .render("#paypal-button-container");
      }
    };
    document.body.appendChild(script);

    return () => {
      const container = document.getElementById("paypal-button-container");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [items, total, router]);

  return (
    <div
      id="paypal-button-container"
      className={disabled ? "opacity-50 pointer-events-none" : ""}
    />
  );
}

declare global {
  interface Window {
    paypal: any;
  }
}
