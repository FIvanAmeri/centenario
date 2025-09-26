"use client";

import { useState } from "react";

export function useEliminarPaciente() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  const eliminarPaciente = async (id: number) => {
    setLoading(true);
    setError(null);
    setExito(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pacientes/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Error al eliminar paciente");
      }

      setExito(true);
    } catch {
      setError("No se pudo eliminar el paciente");
    } finally {
      setLoading(false);
    }
  };

  return { eliminarPaciente, loading, error, exito };
}