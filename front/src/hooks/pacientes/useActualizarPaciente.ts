"use client";

import { useState } from "react";
import { Paciente } from "./usePacientes";

export function useActualizarPaciente() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  const actualizarPaciente = async (id: number, datos: Omit<Paciente, "id">) => {
    setLoading(true);
    setError(null);
    setExito(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pacientes/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );

      if (!res.ok) {
        throw new Error("Error al actualizar paciente");
      }

      setExito(true);
    } catch {
      setError("No se pudo actualizar el paciente");
    } finally {
      setLoading(false);
    }
  };

  return { actualizarPaciente, loading, error, exito };
}