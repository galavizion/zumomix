"use client";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/productos": "Productos",
  "/admin/pedidos": "Pedidos",
  "/admin/inventario": "Inventario",
  "/admin/clientes": "Clientes",
  "/admin/reportes": "Reportes",
};

function getTitle(pathname: string): string {
  if (pathname in PAGE_TITLES) return PAGE_TITLES[pathname];
  for (const [key, value] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(key + "/")) return value;
  }
  return "Admin";
}

export default function AdminHeader() {
  const pathname = usePathname();
  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-display font-bold text-neutral-900 ml-10 lg:ml-0">
        {getTitle(pathname)}
      </h1>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
          <span className="text-white text-xs font-bold">A</span>
        </div>
        <span className="text-sm font-medium text-neutral-700 hidden sm:block">Admin</span>
      </div>
    </header>
  );
}
