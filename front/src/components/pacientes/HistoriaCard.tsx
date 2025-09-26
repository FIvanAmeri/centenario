"use client";

import { Historia } from "@/hooks/pacientes/useHistoria";

interface Props {
  historia: Historia[];
}

export default function HistoriaCard({ historia }: Props) {
  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-xl font-semibold text-[var(--primary)]">Historia clínica</h2>
      {historia.map((h) => (
        <div key={h.id} className="border p-4 rounded">
          <p><strong>Fecha:</strong> {h.fecha}</p>
          <p><strong>Motivo:</strong> {h.motivo}</p>
          <p><strong>Diagnóstico:</strong> {h.diagnostico}</p>
          <p><strong>Observaciones:</strong> {h.observaciones}</p>
          <p><strong>Médico:</strong> {h.medico.nombre} (M.P. {h.medico.matricula})</p>
        </div>
      ))}
    </div>
  );
}