"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { SalesData } from "@/types";

interface SalesChartProps {
  data: SalesData[];
}

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

export default function SalesChart({ data }: SalesChartProps) {
  const chartData = data.map((d) => ({
    fecha: formatShortDate(d.date),
    ventas: d.sales,
    pedidos: d.orders,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7AB536" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#7AB536" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
        <XAxis dataKey="fecha" tick={{ fontSize: 11, fill: "#737373" }} tickLine={false} axisLine={false} interval={4} />
        <YAxis tick={{ fontSize: 11, fill: "#737373" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip
          formatter={(v) => [`$${Number(v).toLocaleString("es-MX")}`, "Ventas"]}
          contentStyle={{ borderRadius: 8, border: "1px solid #E5E5E5", fontSize: 12 }}
        />
        <Area type="monotone" dataKey="ventas" stroke="#7AB536" strokeWidth={2} fill="url(#colorVentas)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
