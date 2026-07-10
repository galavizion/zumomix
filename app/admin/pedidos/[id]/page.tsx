export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_ORDERS } from "@/lib/admin-medusa";
import StatusBadge from "@/components/admin/StatusBadge";
import OrderTimeline from "@/components/admin/OrderTimeline";
import { formatPrice, formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminPedidoDetailPage({ params }: Props) {
  const { id } = await params;
  const order = MOCK_ORDERS.find((o) => o.id === id);
  if (!order) notFound();

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/pedidos" className="text-sm text-neutral-500 hover:text-brand-green transition-colors">
          Volver a pedidos
        </Link>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detalle principal */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Productos */}
          <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
            <h2 className="font-display font-bold text-neutral-900 mb-4">
              Pedido {order.orderNumber}
            </h2>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900">{item.product.name}</p>
                    <p className="text-neutral-500 text-xs">Cant: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-neutral-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-col gap-1 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Envío</span><span>{formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-neutral-900 pt-1">
                <span>Total</span><span className="text-brand-green">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
            <h2 className="font-display font-bold text-neutral-900 mb-3">Dirección de envío</h2>
            <p className="text-sm text-neutral-700">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          {/* Cliente */}
          <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
            <h2 className="font-display font-bold text-neutral-900 mb-3">Cliente</h2>
            <div className="text-sm flex flex-col gap-1.5">
              <p className="font-medium text-neutral-900">{order.customer.name}</p>
              <p className="text-neutral-500">{order.customer.email}</p>
              <p className="text-neutral-500">{order.customer.phone}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
            <h2 className="font-display font-bold text-neutral-900 mb-4">Historial</h2>
            <OrderTimeline timeline={order.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
}
