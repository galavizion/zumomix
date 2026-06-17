import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos. Monterrey: (81) 1809 7022 | Guadalajara: 33 1351 8442 | ventas@zumomix.com",
};

export default function ContactoPage() {
  return <ContactoClient />;
}
