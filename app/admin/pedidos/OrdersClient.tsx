"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Order } from "@/types/customer";

interface OrderWithCustomer extends Order {
  customers: {
    nombre: string;
    email: string;
    telefono?: string;
  };
}

const statusOptions = [
  "pendiente",
  "confirmado",
  "enviado",
  "entregado",
  "cancelado",
];

const statusColors: Record<string, string> = {
  pendiente: "bg-yellow-50 text-yellow-700",
  confirmado: "bg-blue-50 text-blue-700",
  enviado: "bg-purple-50 text-purple-700",
  entregado: "bg-green-50 text-green-700",
  cancelado: "bg-red-50 text-red-700",
};

export default function OrdersClient() {
  const [orders, setOrders] = useState<OrderWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        const updated = await response.json();
        setOrders(
          orders.map((o) => (o.id === orderId ? updated : o))
        );
      }
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <p className="text-neutral-500">Cargando pedidos...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Pedidos</h1>
        <p className="text-sm text-neutral-500">
          {orders.length} pedido{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="bg-white rounded-card border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                {[
                  "ID",
                  "Cliente",
                  "Email",
                  "Total",
                  "Estado",
                  "Método",
                  "Fecha",
                  "",
                ].map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-neutral-600">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900">
                    {order.customers?.nombre || "—"}
                  </td>
                  <td className="px-4 py-3 text-neutral-600 text-xs">
                    {order.customers?.email || "—"}
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-green">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      disabled={updating === order.id}
                      className={`px-2 py-1 rounded text-xs font-semibold border-0 cursor-pointer disabled:opacity-50 ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 text-xs capitalize">
                    {order.payment_method}
                  </td>
                  <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-brand-green hover:text-brand-green-dark text-xs font-medium transition-colors">
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {orders.length === 0 && (
        <div className="bg-neutral-50 rounded-card border border-neutral-200 p-8 text-center">
          <p className="text-neutral-500">No hay pedidos registrados</p>
        </div>
      )}
    </div>
  );
}
