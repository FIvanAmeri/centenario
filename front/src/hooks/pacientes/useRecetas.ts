"use client";

import { useEffect, useState } from "react";

export interface Receta {
  id: number;
  fecha: string;
  medicamentos: string[];
  indicaciones: string;
  medico: {
    nombre: string;
    matricula: string;
  };
}

export function useRecetas(pacienteId: string) {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recetas/${pacienteId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Acceso denegado o error al obtener recetas");
        }

        const data: Receta[] = await res.json();
        setRecetas(data);
      } catch {
        setError("No se pudieron cargar las recetas");
      } finally {
        setLoading(false);
      }
    };

    fetchRecetas();
  }, [pacienteId]);

  return { recetas, loading, error };
}