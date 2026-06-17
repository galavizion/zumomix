"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCustomer } from "@/components/customer/CustomerProvider";

type Tab = "login" | "register";

export default function AuthPage() {
  const router = useRouter();
  const { login, register } = useCustomer();
  const [tab, setTab] = useState<Tab>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    nombre: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(loginForm.email, loginForm.password);
      router.push("/perfil");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(registerForm.email, registerForm.password, registerForm.nombre);
      router.push("/perfil");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-white min-h-screen">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <span className="text-2xl font-display font-bold text-brand-green">
              zumo<span className="text-neutral-900">mix</span>
            </span>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg">
            <div className="flex border-b border-neutral-200">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-4 px-6 font-semibold text-sm transition-colors ${
                  tab === "login"
                    ? "text-brand-green border-b-2 border-brand-green -mb-px"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 py-4 px-6 font-semibold text-sm transition-colors ${
                  tab === "register"
                    ? "text-brand-green border-b-2 border-brand-green -mb-px"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                Registrarse
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {tab === "login" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                  />
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Iniciando..." : "Iniciar sesión"}
                  </Button>
                </form>
              )}

              {tab === "register" && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <Input
                    label="Nombre completo"
                    placeholder="Juan García"
                    value={registerForm.nombre}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, nombre: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="tu@email.com"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, email: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, password: e.target.value })
                    }
                    required
                  />
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Registrando..." : "Registrarse"}
                  </Button>
                </form>
              )}

              <p className="text-xs text-neutral-500 text-center mt-4">
                Al continuar aceptas nuestros{" "}
                <Link href="#" className="text-brand-green hover:underline">
                  términos y condiciones
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
