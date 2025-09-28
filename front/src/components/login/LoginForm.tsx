"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Credenciales inválidas");
        return;
      }

      const { rol } = await res.json();
      const rolNormalizado = rol?.toLowerCase();

      switch (rolNormalizado) {
        case "superadmin":
          router.push("/dashboard/superadmin");
          break;
        case "administrativo":
          router.push("/dashboard/administrativo");
          break;
        case "medico":
          router.push("/dashboard/medico");
          break;
        default:
          setError("Rol inválido o no autorizado");
          break;
      }
    } catch (err) {
      console.error("💥 Error de conexión:", err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold text-center text-neutral-900 mb-8">
        Iniciar Sesión
      </h1>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="usuario@hospital.gob.ar"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-lg border-2 border-neutral-300 px-4 py-2.5 text-neutral-900 shadow-inner focus:border-green-600 focus:ring-green-600 focus:outline-none transition duration-200"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-neutral-900 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border-2 border-neutral-300 px-4 py-2.5 text-neutral-900 shadow-inner focus:border-green-600 focus:ring-green-600 focus:outline-none transition duration-200"
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          Acceder
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-900 mb-4">¿No tienes cuenta?</p>
        <button
          type="button"
          onClick={() => router.push("/registro")}
          className="w-full bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-2.5 px-4 rounded-lg transition-all"
        >
          Regístrate
        </button>
      </div>
    </div>
  );
}