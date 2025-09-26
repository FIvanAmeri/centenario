"use client";

import { Receta } from "@/hooks/pacientes/useRecetas";

interface Props {
  recetas: Receta[];
}

export default function RecetasCard({ recetas }: Props) {
  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-xl font-semibold text-[var(--primary)]">Recetas médicas</h2>
      {recetas.map((r) => (
        <div key={r.id} className="border p-4 rounded">
          <p><strong>Fecha:</strong> {r.fecha}</p>
          <p><strong>Medicamentos:</strong> {r.medicamentos.join(", ")}</p>
          <p><strong>Indicaciones:</strong> {r.indicaciones}</p>
          <p><strong>Médico:</strong> {r.medico.nombre} (M.P. {r.medico.matricula})</p>
        </div>
      ))}
    </div>
  );
}