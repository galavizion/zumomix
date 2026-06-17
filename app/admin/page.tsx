import { ShoppingBag, DollarSign, Package, Users } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import StatusBadge from "@/components/admin/StatusBadge";
import SalesChart from "@/components/admin/SalesChart";
import { MOCK_ORDERS, MOCK_SALES } from "@/lib/admin-medusa";
import { PRODUCTS } from "@/lib/constants";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const lowStock = PRODUCTS.filter((p) => p.stock <= 6);

  return (
    <div className="flex flex-col gap-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Pedidos hoy" value="3" subtitle="+2 vs. ayer" icon={ShoppingBag} trend="up" />
        <StatsCard title="Ingresos del mes" value={formatPrice(892500)} subtitle="+18% vs. mes anterior" icon={DollarSign} trend="up" />
        <StatsCard title="Productos activos" value="6" icon={Package} />
        <StatsCard title="Clientes" value="128" subtitle="+5 este mes" icon={Users} trend="up" />
      </div>

      {/* Gráfica */}
      <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
        <h2 className="font-display font-bold text-neutral-900 mb-6">Ventas últimos 30 días</h2>
        <SalesChart data={MOCK_SALES} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos pedidos */}
        <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
          <h2 className="font-display font-bold text-neutral-900 mb-4">Últimos pedidos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">Pedido</th>
                  <th className="pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">Cliente</th>
                  <th className="pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">Total</th>
                  <th className="pb-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">Estado</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-100 last:border-0">
                    <td className="py-3 font-medium text-neutral-900">
                      <a href={`/admin/pedidos/${order.id}`} className="hover:text-brand-green transition-colors">
                        {order.orderNumber}
                      </a>
                    </td>
                    <td className="py-3 text-neutral-600 truncate max-w-[140px]">{order.customer.name}</td>
                    <td className="py-3 font-semibold text-neutral-900">{formatPrice(order.total)}</td>
                    <td className="py-3"><StatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock bajo */}
        <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
          <h2 className="font-display font-bold text-neutral-900 mb-4">Stock bajo</h2>
          {lowStock.length === 0 ? (
            <p className="text-sm text-neutral-500">Todos los productos tienen stock suficiente.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                  <span className="text-sm text-neutral-700 truncate pr-4">{p.name}</span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    p.stock === 0 ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {p.stock === 0 ? "Agotado" : `${p.stock} uds.`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
