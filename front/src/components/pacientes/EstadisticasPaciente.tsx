"use client";

import { EstadisticasPaciente } from "@/hooks/pacientes/useEstadisticasPaciente";

export default function EstadisticasPacienteCard({
  estadisticas,
}: {
  estadisticas: EstadisticasPaciente;
}) {
  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-[var(--primary)]">
        Estadísticas médicas del paciente
      </h2>

      <p><strong>Total de consultas:</strong> {estadisticas.totalConsultas}</p>

      <div>
        <h3 className="font-semibold mt-2">Diagnósticos más frecuentes:</h3>
        <ul className="list-disc list-inside">
          {estadisticas.diagnosticosFrecuentes.map((d, i) => (
            <li key={i}>
              {d.diagnostico} ({d.cantidad})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mt-2">Consultas por mes:</h3>
        <ul className="list-disc list-inside">
          {estadisticas.consultasPorMes.map((m, i) => (
            <li key={i}>
              {m.mes}: {m.cantidad}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}