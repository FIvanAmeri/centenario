"use client";

import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: "administrativo" | "medico" | "superadmin";
}

export function useUser() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            method: "GET",
            credentials: "include", // ✅ para que la cookie viaje
          }
        );

        if (!res.ok) {
          throw new Error("No se pudo obtener el usuario");
        }

        const data: Usuario = await res.json();
        setUsuario(data);
      } catch (err) {
        setError("Error al cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  return { usuario, loading, error };
}