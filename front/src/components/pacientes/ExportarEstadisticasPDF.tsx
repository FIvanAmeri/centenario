"use client";

import { useState } from "react";
import { descargarPDFEstadisticas } from "@/hooks/pacientes/useExportarEstadisticasPDF";

export default function ExportarEstadisticasPDF({ pacienteId }: { pacienteId: number }) {
  const [error, setError] = useState<string | null>(null);

  const handleExportar = async () => {
    setError(null);
    try {
      await descargarPDFEstadisticas(pacienteId);
    } catch {
      setError("No se pudo exportar las estadísticas");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-[var(--primary)]">Exportar estadísticas</h2>
      <button
        onClick={handleExportar}
        className="bg-[var(--primary)] text-white px-4 py-2 rounded"
      >
        Descargar PDF
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}