export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_CUSTOMERS, MOCK_ORDERS } from "@/lib/admin-medusa";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice, formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminClienteDetailPage({ params }: Props) {
  const { id } = await params;
  const customer = MOCK_CUSTOMERS.find((c) => c.id === id);
  if (!customer) notFound();

  const orders = MOCK_ORDERS.filter((o) => o.customer.id === id);

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      <Link href="/admin/clientes" className="text-sm text-neutral-500 hover:text-brand-green transition-colors">
        Volver a clientes
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 bg-white rounded-card border border-neutral-200 p-6 shadow-card">
          <h2 className="font-display font-bold text-lg text-neutral-900 mb-4">{customer.name}</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-neutral-500">Email</dt>
              <dd className="font-medium text-neutral-900">{customer.email}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Teléfono</dt>
              <dd className="font-medium text-neutral-900">{customer.phone}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Registro</dt>
              <dd className="font-medium text-neutral-900">{formatDate(customer.createdAt)}</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-brand-green-light rounded-card p-4 text-center">
            <p className="text-2xl font-display font-bold text-brand-green-dark">{customer.orders}</p>
            <p className="text-xs text-neutral-600 mt-1">Pedidos totales</p>
          </div>
          <div className="bg-neutral-50 rounded-card p-4 text-center border border-neutral-200">
            <p className="text-xl font-display font-bold text-neutral-900">{formatPrice(customer.totalSpent)}</p>
            <p className="text-xs text-neutral-500 mt-1">Total gastado</p>
          </div>
        </div>
      </div>

      {orders.length > 0 && (
        <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
          <h2 className="font-display font-bold text-neutral-900 mb-4">Historial de pedidos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  {["Pedido", "Fecha", "Total", "Estado"].map((h) => (
                    <th key={h} className="pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-neutral-100 last:border-0">
                    <td className="py-3 font-semibold text-brand-green">
                      <Link href={`/admin/pedidos/${o.id}`} className="hover:underline">{o.orderNumber}</Link>
                    </td>
                    <td className="py-3 text-neutral-500">{formatDate(o.date)}</td>
                    <td className="py-3 font-semibold text-neutral-900">{formatPrice(o.total)}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
