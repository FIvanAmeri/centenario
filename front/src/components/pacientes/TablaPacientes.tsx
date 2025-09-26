"use client";

import { useState } from "react";
import { usePacientes } from "@/hooks/pacientes/usePacientes";
import { useEliminarPaciente } from "@/hooks/pacientes/useEliminarPaciente";
import ModalEditarPaciente from "./ModalEditarPaciente";

export default function TablaPacientes() {
  const { pacientes, loading, error } = usePacientes();
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<number | null>(null);
  const [idParaEliminar, setIdParaEliminar] = useState<number | null>(null);

  const { eliminarPaciente, loading: eliminando, error: errorEliminar, exito } = useEliminarPaciente();

  const paciente = pacientes.find((p) => p.id === pacienteSeleccionado);

  const confirmarYEliminar = async () => {
    if (idParaEliminar !== null) {
      await eliminarPaciente(idParaEliminar);
      setIdParaEliminar(null);
    }
  };

  if (loading) return <p>Cargando pacientes...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="overflow-x-auto bg-white rounded shadow p-4">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--primary)] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">DNI</th>
            <th className="px-4 py-2 text-left">Nacimiento</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Correo</th>
            <th className="px-4 py-2 text-left">Dirección</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="px-4 py-2">{p.nombre}</td>
              <td className="px-4 py-2">{p.dni}</td>
              <td className="px-4 py-2">{p.fechaNacimiento}</td>
              <td className="px-4 py-2">{p.telefono}</td>
              <td className="px-4 py-2">{p.correo}</td>
              <td className="px-4 py-2">
                {`${p.direccion.calle}, ${p.direccion.barrio}, ${p.direccion.ciudad}, ${p.direccion.provincia}, ${p.direccion.pais}`}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => setPacienteSeleccionado(p.id)}
                  className="text-[var(--primary)] underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => setIdParaEliminar(p.id)}
                  className="text-red-600 underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {paciente && (
        <ModalEditarPaciente
          paciente={paciente}
          onClose={() => setPacienteSeleccionado(null)}
          onSuccess={() => setPacienteSeleccionado(null)}
        />
      )}

      {idParaEliminar !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-red-600">
              Confirmar eliminación
            </h2>
            <p className="text-gray-700">
              ¿Estás seguro que querés eliminar este paciente? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-between pt-4">
              <button
                onClick={confirmarYEliminar}
                disabled={eliminando}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                {eliminando ? "Eliminando..." : "Eliminar"}
              </button>
              <button
                onClick={() => setIdParaEliminar(null)}
                className="text-[var(--primary)] underline"
              >
                Cancelar
              </button>
            </div>
            {errorEliminar && <p className="text-red-600">{errorEliminar}</p>}
            {exito && <p className="text-green-600">Paciente eliminado correctamente.</p>}
          </div>
        </div>
      )}
    </div>
  );
}