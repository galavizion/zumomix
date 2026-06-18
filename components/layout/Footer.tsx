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
                  href={`tel:${CONTACT.phoneMonterrey}`}
                  className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-brand-green"
                  style={{ color: "#555" }}
                >
                  <Phone size={14} />
                  Monterrey: {CONTACT.phoneMonterrey}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneGuadalajara}`}
                  className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-brand-green"
                  style={{ color: "#555" }}
                >
                  <Phone size={14} />
                  Guadalajara: {CONTACT.phoneGuadalajara}
                </a>
              </li>
              <li className="flex items-center gap-4 pt-1">
                <a href="https://www.instagram.com/zumomix.mx" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-sm font-medium transition-colors duration-300 hover:text-brand-green" style={{ color: "#555" }}>
                  Instagram
                </a>
                <a href="https://www.facebook.com/ZumomixExprimidores" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-sm font-medium transition-colors duration-300 hover:text-brand-green" style={{ color: "#555" }}>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid #d8d8d8" }}>
          <p className="text-xs" style={{ color: "#888" }}>
            &copy; {new Date().getFullYear()} Zumomix. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#888" }}>
            <span>Pagos seguros con</span>
            <span className="font-semibold" style={{ color: "#666" }}>Stripe</span>
            <span>&amp;</span>
            <span className="font-semibold" style={{ color: "#666" }}>PayPal</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
