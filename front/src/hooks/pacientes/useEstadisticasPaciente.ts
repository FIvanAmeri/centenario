"use client";

import { useEffect, useState } from "react";
import { Historia } from "./useHistoria";

export interface EstadisticasPaciente {
  totalConsultas: number;
  diagnosticosFrecuentes: { diagnostico: string; cantidad: number }[];
  consultasPorMes: { mes: string; cantidad: number }[];
}

export function useEstadisticasPaciente(pacienteId: string) {
  const [estadisticas, setEstadisticas] = useState<EstadisticasPaciente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/historia/${pacienteId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Error al obtener historia clínica");

        const data: Historia[] = await res.json();

        const totalConsultas = data.length;

        const diagnosticoMap = new Map<string, number>();
        const mesMap = new Map<string, number>();

        data.forEach((h) => {
          const diag = h.diagnostico.trim();
          diagnosticoMap.set(diag, (diagnosticoMap.get(diag) || 0) + 1);


          const mes = new Date(h.fecha).toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
          mesMap.set(mes, (mesMap.get(mes) || 0) + 1);
        });

        const diagnosticosFrecuentes = Array.from(diagnosticoMap.entries())
          .map(([diagnostico, cantidad]) => ({ diagnostico, cantidad }))
          .sort((a, b) => b.cantidad - a.cantidad);

        const consultasPorMes = Array.from(mesMap.entries())
          .map(([mes, cantidad]) => ({ mes, cantidad }))
          .sort((a, b) => new Date(a.mes).getTime() - new Date(b.mes).getTime());

        setEstadisticas({ totalConsultas, diagnosticosFrecuentes, consultasPorMes });
      } catch {
        setError("No se pudieron calcular las estadísticas");
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, [pacienteId]);

  return { estadisticas, loading, error };
}