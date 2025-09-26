"use client";

import { useEffect, useState } from "react";

export interface Paciente {
  id: number;
  nombre: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  correo: string;
  direccion: {
    pais: string;
    provincia: string;
    ciudad: string;
    barrio: string;
    calle: string;
  };
}

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pacientes`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Error al obtener pacientes");
        }

        const data: Paciente[] = await res.json();
        setPacientes(data);
      } catch {
        setError("No se pudieron cargar los pacientes");
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  return { pacientes, loading, error };
}