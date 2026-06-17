import { PRODUCTS } from "@/lib/constants";

const MIN_STOCK = 5;

function getStatus(stock: number) {
  if (stock === 0) return { label: "Agotado", className: "bg-red-100 text-red-600" };
  if (stock <= MIN_STOCK) return { label: "Bajo", className: "bg-yellow-100 text-yellow-700" };
  return { label: "OK", className: "bg-brand-green-light text-brand-green-dark" };
}

export default function AdminInventarioPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-neutral-500">
        Nivel mínimo de stock configurado: {MIN_STOCK} unidades
      </p>

      <div className="bg-white rounded-card border border-neutral-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                {["Producto", "SKU", "Stock actual", "Stock mínimo", "Estado"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => {
                const st = getStatus(p.stock);
                return (
                  <tr key={p.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-neutral-900">{p.name}</td>
                    <td className="px-4 py-3 text-neutral-500 font-mono text-xs">{p.sku}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${p.stock === 0 ? "text-red-500" : p.stock <= MIN_STOCK ? "text-yellow-600" : "text-brand-green"}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">{MIN_STOCK}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${st.className}`}>
                        {st.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
