"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import Container from "@/components/ui/Container";
import "./navbar.css";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/concentrados", label: "Concentrados" },
  { href: "/contacto", label: "Contacto" },
];

interface NavbarProps {
  logoUrl?: string;
  logoText?: string;
}

export default function Navbar({ logoUrl, logoText }: NavbarProps) {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar-header sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cartPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes badgeScale {
          0% {
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        .navbar-header {
          animation: slideDown 0.4s ease-out;
        }
        .navbar-cart {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .navbar-cart:hover {
          transform: translateY(-2px);
          color: rgb(122, 181, 54);
        }
        .cart-badge {
          animation: badgeScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: rgb(122, 181, 54);
          box-shadow: 0 2px 8px rgba(122, 181, 54, 0.4);
        }
        .nav-link {
          transition: all 0.3s ease;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: rgb(122, 181, 54);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .logo-link {
          transition: all 0.3s ease;
        }
        .logo-link:hover span {
          letter-spacing: 0.05em;
        }
      `}</style>
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="logo-link flex items-center gap-2">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoText || "Zumomix"}
                width={140}
                height={40}
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
                priority
              />
            ) : (
              <span className="text-2xl font-display font-bold text-brand-green">
                {logoText ? (
                  logoText
                ) : (
                  <>zumo<span className="text-neutral-900">mix</span></>
                )}
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link text-sm font-medium text-neutral-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5218118097022"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#25D366] hover:text-[#128C7E] transition-all duration-300"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

            <Link
              href="/carrito"
              className="navbar-cart relative p-2 text-neutral-700"
              aria-label={`Carrito con ${itemCount} productos`}
            >
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="cart-badge absolute -top-1 -right-1 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-neutral-700 transition-all duration-300 hover:text-brand-green"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4 animate-in">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-2 py-1.5 text-sm font-medium text-neutral-700 hover:text-brand-green transition-colors duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/5218118097022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-[#25D366]"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
