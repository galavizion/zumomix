"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCustomer } from "@/components/customer/CustomerProvider";
import { Order } from "@/types/customer";
import { formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";

const statusColors: Record<string, string> = {
  pendiente: "bg-yellow-50 text-yellow-700",
  confirmado: "bg-blue-50 text-blue-700",
  enviado: "bg-purple-50 text-purple-700",
  entregado: "bg-green-50 text-green-700",
  cancelado: "bg-red-50 text-red-700",
};

const statusLabels: Record<string, string> = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export default function OrdersPage() {
  const { customer, loading } = useCustomer();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (customer) {
      fetchOrders();
    }
  }, [customer]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/customer/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  if (loading || ordersLoading) {
    return (
      <div className="py-20 bg-white min-h-screen">
        <Container>
          <p className="text-center text-neutral-500">Cargando...</p>
        </Container>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="py-20 bg-white min-h-screen">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <p className="text-neutral-500 mb-4">Debes iniciar sesión primero</p>
            <Link href="/auth">
              <Button size="lg">Ir a login</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Package size={32} className="text-brand-green" />
            <div>
              <h1 className="text-3xl font-display font-bold text-neutral-900">
                Mis pedidos
              </h1>
              <p className="text-neutral-500">
                Total: {orders.length} pedido{orders.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-12 text-center">
              <Package size={48} className="mx-auto text-neutral-300 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-700 mb-2">
                No tienes pedidos
              </h3>
              <p className="text-neutral-500 mb-6">
                Comienza a comprar equipos Zumomix hoy
              </p>
              <Link href="/productos">
                <Button>Ver productos</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                        Número de orden
                      </p>
                      <p className="font-mono text-sm text-neutral-900">
                        {order.id.slice(0, 8)}...
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                        Total
                      </p>
                      <p className="font-bold text-brand-green text-lg">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                        Estado
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[order.status]
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                        Fecha
                      </p>
                      <p className="text-sm text-neutral-700">
                        {new Date(order.created_at).toLocaleDateString("es-MX")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <Link href="/perfil">
              <Button variant="outline">← Volver al perfil</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
