import { CONTACT } from "@/lib/constants";

export default function TopBar() {
  return (
    <div
      style={{
        background: "#1a1a1a",
        color: "#ccc",
        fontSize: "12.5px",
        padding: "7px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {/* Left: phones */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <a
            href={`tel:${CONTACT.phoneMonterrey.replace(/\D/g, "")}`}
            style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <PhoneIcon />
            <span>MTY: {CONTACT.phoneMonterrey}</span>
          </a>
          <a
            href={`tel:${CONTACT.phoneGuadalajara.replace(/\D/g, "")}`}
            style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <PhoneIcon />
            <span>GDL: {CONTACT.phoneGuadalajara}</span>
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            style={{ color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <MailIcon />
            <span>{CONTACT.email}</span>
          </a>
        </div>

        {/* Right: socials */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <a
            href="https://www.facebook.com/ZumomixExprimidores"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{ color: "#ccc", display: "flex", alignItems: "center" }}
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/zumomix.mx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ color: "#ccc", display: "flex", alignItems: "center" }}
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.32 17.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
