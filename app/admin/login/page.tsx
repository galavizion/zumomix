import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = { title: "Login | Admin Zumomix" };

export default function AdminLoginPage() {
  return <LoginClient />;
}
