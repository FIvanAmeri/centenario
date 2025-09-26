"use client";

import { useEffect, useState } from "react";

export interface Historia {
  id: number;
  pacienteId: number;
  fecha: string;
  motivo: string;
  diagnostico: string;
  observaciones: string;
  medico: {
    nombre: string;
    matricula: string;
  };
}

export function useHistoria(pacienteId: string) {
  const [historia, setHistoria] = useState<Historia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/historia/${pacienteId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Acceso denegado o error al obtener historia clínica");
        }

        const data: Historia[] = await res.json();
        setHistoria(data);
      } catch {
        setError("No se pudo cargar la historia clínica");
      } finally {
        setLoading(false);
      }
    };

    fetchHistoria();
  }, [pacienteId]);

  return { historia, loading, error };
}