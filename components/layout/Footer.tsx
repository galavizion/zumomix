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

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="ig-footer" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-footer)" />
      <circle cx="12" cy="12" r="4" stroke="url(#ig-footer)" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="#bc1888" />
    </svg>
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
              <li className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.facebook.com/ZumomixExprimidores"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-opacity hover:opacity-75"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://www.instagram.com/zumomix.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-opacity hover:opacity-75"
                >
                  <InstagramIcon />
                </a>
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
            <a
              href="https://www.facebook.com/ZumomixExprimidores"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-opacity hover:opacity-75"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/zumomix.mx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-75"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
