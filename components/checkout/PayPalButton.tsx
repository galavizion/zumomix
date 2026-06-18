"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

interface PayPalButtonProps {
  onSuccess?: () => void;
}

export default function PayPalButton({ onSuccess }: PayPalButtonProps) {
  const { items } = useCart();
  const router = useRouter();
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;

    function renderButtons() {
      if (!window.paypal || rendered.current) return;
      rendered.current = true;

      window.paypal
        .Buttons({
          createOrder: async () => {
            try {
              const res = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  items: items.map((i) => ({
                    productId: i.product.id,
                    quantity: i.quantity,
                  })),
                }),
              });
              const data = await res.json();
              if (!data.id) throw new Error("Sin ID de orden");
              return data.id;
            } catch (err) {
              console.error("Error creando orden:", err);
              alert("Error al iniciar el pago. Intenta de nuevo.");
            }
          },
          onApprove: async (data: { orderID: string }) => {
            try {
              const res = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderID: data.orderID,
                  items: items.map((i) => ({
                    productId: i.product.id,
                    quantity: i.quantity,
                  })),
                }),
              });
              const result = await res.json();
              if (result.status === "COMPLETED") {
                onSuccess?.();
                router.push(`/checkout/success?orderId=${result.id}`);
              } else {
                alert("El pago no se completó. Intenta de nuevo.");
              }
            } catch (err) {
              console.error("Error capturando pago:", err);
              alert("Error al procesar el pago.");
            }
          },
          onError: (err: unknown) => {
            console.error("PayPal error:", err);
            alert("Ocurrió un error con PayPal. Intenta de nuevo.");
          },
          onCancel: () => {
            console.log("Pago cancelado por el usuario.");
          },
        })
        .render("#paypal-button-container");
    }

    if (window.paypal) {
      renderButtons();
      return;
    }

    const existing = document.querySelector('script[data-paypal-sdk]');
    if (existing) {
      existing.addEventListener("load", renderButtons);
      return () => existing.removeEventListener("load", renderButtons);
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=MXN&locale=es_MX`;
    script.async = true;
    script.dataset.paypalSdk = "true";
    script.onload = renderButtons;
    script.onerror = () => {
      console.error("No se pudo cargar el SDK de PayPal");
    };
    document.body.appendChild(script);
  }, [items, router, onSuccess]);

  useEffect(() => {
    return () => {
      const container = document.getElementById("paypal-button-container");
      if (container) container.innerHTML = "";
      rendered.current = false;
    };
  }, []);

  return (
    <div>
      <div id="paypal-button-container" className="min-h-12.5" />
    </div>
  );
}

declare global {
  interface Window {
    paypal: any;
  }
}
