"use client";

import { useState } from "react";
import { Paciente } from "./usePacientes";

export function useCrearPaciente() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  const crearPaciente = async (datos: Omit<Paciente, "id">) => {
    setLoading(true);
    setError(null);
    setExito(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pacientes`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );

      if (!res.ok) {
        throw new Error("Error al registrar paciente");
      }

      setExito(true);
    } catch {
      setError("No se pudo registrar el paciente");
    } finally {
      setLoading(false);
    }
  };

  return { crearPaciente, loading, error, exito };
}