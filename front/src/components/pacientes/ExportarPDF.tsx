"use client";

import { useState } from "react";
import { descargarPDFHistoria, descargarPDFRecetas } from "@/hooks/pacientes/useExportacionPDF";

export default function ExportarPDF({ pacienteId }: { pacienteId: number }) {
  const [error, setError] = useState<string | null>(null);

  const handleHistoria = async () => {
    setError(null);
    try {
      await descargarPDFHistoria(pacienteId);
    } catch {
      setError("No se pudo descargar la historia clínica");
    }
  };

  const handleRecetas = async () => {
    setError(null);
    try {
      await descargarPDFRecetas(pacienteId);
    } catch {
      setError("No se pudo descargar las recetas");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-[var(--primary)]">Exportar PDF</h2>
      <div className="flex gap-4">
        <button
          onClick={handleHistoria}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded"
        >
          Historia clínica
        </button>
        <button
          onClick={handleRecetas}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded"
        >
          Recetas médicas
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}