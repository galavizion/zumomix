"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";
import { Mail, Phone } from "lucide-react";

const PRODUCT_LINKS = [
  { href: "/productos/exprimidora-business-1-plus", label: "Exprimidora Business 1 Plus" },
  { href: "/productos/exprimidora-business-2", label: "Exprimidora Business 2" },
  { href: "/productos/exprimidora-pro-1", label: "Exprimidora Pro 1" },
  { href: "/productos/exprimidor-atomic", label: "Exprimidor Atomic" },
  { href: "/productos/dispensadora-mix2-mix3", label: "Dispensadora MIX2 y MIX3" },
  { href: "/productos/maquina-granita", label: "Máquina Granita" },
];

interface FooterProps {
  logoUrl?: string;
  logoText?: string;
}

function SocialLink({ href, label, bg, children }: { href: string; label: string; bg: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: "56px", height: "56px", borderRadius: "50%",
        background: bg, display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.18)", flexShrink: 0,
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      {children}
    </a>
  );
}

export default function Footer({ logoUrl, logoText }: FooterProps) {
  return (
    <footer style={{ background: "#efefef", color: "#333" }}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14">
          {/* Col 1 — Logo */}
          <div className="flex flex-col gap-4">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoText || "Zumomix"}
                width={140}
                height={48}
                style={{ objectFit: "contain", objectPosition: "left" }}
                unoptimized
              />
            ) : (
              <span className="text-2xl font-display font-bold text-brand-green">
                zumo<span style={{ color: "#222" }}>mix</span>
              </span>
            )}
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#666" }}>
              Marca especializada en equipos profesionales para negocios. Productos robustos a precio accesible. Monterrey y Guadalajara.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#333" }}>
              Productos
            </h3>
            <ul className="flex flex-col gap-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-brand-green"
                    style={{ color: "#555" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#333" }}>
              Contacto
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-brand-green"
                  style={{ color: "#555" }}
                >
                  <Mail size={14} />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneMonterrey.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-brand-green"
                  style={{ color: "#555" }}
                >
                  <Phone size={14} />
                  Monterrey: {CONTACT.phoneMonterrey}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneGuadalajara.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-brand-green"
                  style={{ color: "#555" }}
                >
                  <Phone size={14} />
                  Guadalajara: {CONTACT.phoneGuadalajara}
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <SocialLink href="https://www.facebook.com/ZumomixExprimidores" label="Facebook" bg="rgb(24,119,242)">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </SocialLink>
                <SocialLink href="https://www.instagram.com/zumomix.mx" label="Instagram" bg="radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </SocialLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid #d8d8d8" }}>
          <p className="text-xs" style={{ color: "#888" }}>
            &copy; {new Date().getFullYear()} Zumomix. Todos los derechos reservados.
          </p>
          {/* Payment methods */}
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: "#888" }}>Pagos seguros:</span>
            <Image
              src="/paypal.webp"
              alt="PayPal"
              width={72}
              height={20}
              style={{ objectFit: "contain", height: "20px", width: "auto" }}
            />
            <SocialLink href="https://www.facebook.com/ZumomixExprimidores" label="Facebook" bg="rgb(24,119,242)">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </SocialLink>
            <SocialLink href="https://www.instagram.com/zumomix.mx" label="Instagram" bg="radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </SocialLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
