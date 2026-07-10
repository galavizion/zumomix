export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Customer {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  calle?: string;
  ciudad?: string;
  estado?: string;
  cp?: string;
  created_at: string;
}

export default function AdminClientesPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/admin/customers");
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-neutral-500">Cargando clientes...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Clientes</h1>
        <p className="text-sm text-neutral-500">
          {customers.length} clientes registrados
        </p>
      </div>

      <div className="bg-white rounded-card border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                {[
                  "Nombre",
                  "Email",
                  "Teléfono",
                  "Ciudad",
                  "Registrado",
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
              {customers.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-neutral-900 max-w-[160px] truncate">
                    {c.nombre}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{c.email}</td>
                  <td className="px-4 py-3 text-neutral-500">
                    {c.telefono || "—"}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {c.ciudad || "—"}
                  </td>
                  <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">
                    {formatDate(c.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/clientes/${c.id}`}
                      className="text-brand-green hover:text-brand-green-dark text-xs font-medium transition-colors"
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {customers.length === 0 && (
        <div className="bg-neutral-50 rounded-card border border-neutral-200 p-8 text-center">
          <p className="text-neutral-500">No hay clientes registrados</p>
        </div>
      )}
    </div>
  );
}
