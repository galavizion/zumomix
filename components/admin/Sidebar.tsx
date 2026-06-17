"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingBag, Layers, Users, BarChart2, Home,
  ExternalLink, LogOut, Menu, X, Settings2,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/inicio", label: "Inicio", icon: Home },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag },
  { href: "/admin/inventario", label: "Inventario", icon: Layers },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/reportes", label: "Reportes", icon: BarChart2 },
  { href: "/admin/ajustes", label: "Ajustes", icon: Settings2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-neutral-200">
        <span className="text-xl font-display font-bold text-brand-green">
          zumo<span className="text-neutral-900">mix</span>
        </span>
        <span className="block text-xs text-neutral-400 mt-0.5">Panel de administración</span>
      </div>
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "bg-brand-green-light text-brand-green-dark"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  <Icon size={18} className={active ? "text-brand-green" : ""} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-3 py-4 border-t border-neutral-200 flex flex-col gap-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors duration-200"
        >
          <ExternalLink size={18} /> Ver tienda
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full text-left"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-neutral-200 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-card border border-neutral-200 shadow-card"
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed top-0 left-0 z-50 w-60 h-screen bg-white shadow-xl lg:hidden">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
