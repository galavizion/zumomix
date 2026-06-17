"use client";
import { MOCK_SALES, MOCK_ORDERS, MOCK_CUSTOMERS } from "@/lib/admin-medusa";
import { PRODUCTS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import SalesChart from "@/components/admin/SalesChart";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Button from "@/components/ui/Button";
import { Download } from "lucide-react";

const productSales = PRODUCTS.map((p, i) => ({
  name: p.name.split(" ").slice(0, 2).join(" "),
  ventas: (6 - i) * 3,
}));

const totalRevenue = MOCK_SALES.reduce((s, d) => s + d.sales, 0);
const totalOrders = MOCK_ORDERS.length;
const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

function exportCSV() {
  const header = "Fecha,Ventas,Pedidos";
  const rows = MOCK_SALES.map((d) => `${d.date},${d.sales},${d.orders}`).join("\n");
  const blob = new Blob([`${header}\n${rows}`], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reporte-ventas-zumomix.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportesClient() {
  return (
    <div className="flex flex-col gap-8">
      {/* Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Ingresos totales", value: formatPrice(totalRevenue) },
          { label: "Ticket promedio", value: formatPrice(avgTicket) },
          { label: "Pedidos totales", value: String(totalOrders) },
          { label: "Clientes nuevos", value: String(MOCK_CUSTOMERS.length) },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-card border border-neutral-200 p-5 shadow-card">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-neutral-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
          <Download size={15} /> Exportar CSV
        </Button>
      </div>

      {/* Ventas por período */}
      <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
        <h2 className="font-display font-bold text-neutral-900 mb-6">Ventas por período (últimos 30 días)</h2>
        <SalesChart data={MOCK_SALES} />
      </div>

      {/* Productos más vendidos */}
      <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
        <h2 className="font-display font-bold text-neutral-900 mb-6">Productos más vendidos</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={productSales} layout="vertical" margin={{ left: 8, right: 24, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#737373" }} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#737373" }} tickLine={false} axisLine={false} width={110} />
            <Tooltip
              formatter={(v) => [`${Number(v)} unidades`, "Vendidos"]}
              contentStyle={{ borderRadius: 8, border: "1px solid #E5E5E5", fontSize: 12 }}
            />
            <Bar dataKey="ventas" fill="#7AB536" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 */}
      <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-card">
        <h2 className="font-display font-bold text-neutral-900 mb-4">Top 5 productos</h2>
        <ol className="flex flex-col gap-3">
          {productSales.slice(0, 5).map((p, i) => (
            <li key={p.name} className="flex items-center gap-4">
              <span className="w-6 h-6 rounded-full bg-brand-green-light text-brand-green-dark text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <span className="flex-1 text-sm text-neutral-700">{p.name}</span>
              <span className="text-sm font-semibold text-neutral-900">{p.ventas} uds.</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
