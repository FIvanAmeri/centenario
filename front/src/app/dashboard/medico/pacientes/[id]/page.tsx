"use client";

import { useParams } from "next/navigation";
import HistoriaCard from "@/components/pacientes/HistoriaCard";
import RecetasCard from "@/components/pacientes/RecetasCard";
import FormularioHistoria from "@/components/pacientes/FormularioHistoria";
import FormularioReceta from "@/components/pacientes/FormularioReceta";
import ExportarPDF from "@/components/pacientes/ExportarPDF";
import EstadisticasPacienteCard from "@/components/pacientes/EstadisticasPaciente";
import ExportarEstadisticasPDF from "@/components/pacientes/ExportarEstadisticasPDF";
import { useHistoria } from "@/hooks/pacientes/useHistoria";
import { useRecetas } from "@/hooks/pacientes/useRecetas";
import { useEstadisticasPaciente } from "@/hooks/pacientes/useEstadisticasPaciente";

export default function DetallePacienteMedicoPage() {
  const { id } = useParams();
  const pacienteId = parseInt(id as string, 10);

  const {
    historia,
    loading: cargandoHistoria,
    error: errorHistoria,
  } = useHistoria(id as string);

  const {
    recetas,
    loading: cargandoRecetas,
    error: errorRecetas,
  } = useRecetas(id as string);

  const {
    estadisticas,
    loading: cargandoEstadisticas,
    error: errorEstadisticas,
  } = useEstadisticasPaciente(id as string);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--primary)]">
        Historia clínica y recetas
      </h1>

      {/* Historia clínica */}
      {cargandoHistoria ? (
        <p>Cargando historia clínica...</p>
      ) : errorHistoria ? (
        <p className="text-red-600">{errorHistoria}</p>
      ) : (
        <HistoriaCard historia={historia} />
      )}

      {/* Formulario de historia */}
      <FormularioHistoria pacienteId={pacienteId} />

      {/* Recetas médicas */}
      {cargandoRecetas ? (
        <p>Cargando recetas...</p>
      ) : errorRecetas ? (
        <p className="text-red-600">{errorRecetas}</p>
      ) : (
        <RecetasCard recetas={recetas} />
      )}

      {/* Formulario de receta */}
      <FormularioReceta pacienteId={pacienteId} />

      {/* Exportación PDF de historia y recetas */}
      <ExportarPDF pacienteId={pacienteId} />

      {/* Estadísticas médicas */}
      {cargandoEstadisticas ? (
        <p>Cargando estadísticas...</p>
      ) : errorEstadisticas ? (
        <p className="text-red-600">{errorEstadisticas}</p>
      ) : estadisticas ? (
        <>
          <EstadisticasPacienteCard estadisticas={estadisticas} />
          <ExportarEstadisticasPDF pacienteId={pacienteId} />
        </>
      ) : null}
    </div>
  );
}