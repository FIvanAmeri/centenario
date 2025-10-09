"use client";

import { useEffect, useState } from "react";
import { UserResponseDto } from "@/types/UserResponseDto";

export default function HistorialSolicitudesMedico() {
  const [usuarios, setUsuarios] = useState<UserResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarUsuarios = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const data: UserResponseDto[] = await res.json();
      const medicos = data.filter((u) => u.rol === "medico");
      setUsuarios(medicos);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const aprobados = usuarios.filter((u) => u.activo === true);
  const pendientes = usuarios.filter((u) => u.activo === false);

  return (
    <div className="relative">
      <h2 className="text-xl font-bold mb-4 text-white">Historial de solicitudes médicas</h2>
      {loading && <p className="text-white">Cargando...</p>}

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold text-green-400 mb-2">Aprobados</h3>
          {aprobados.length === 0 ? (
            <p className="text-white">No hay médicos aprobados.</p>
          ) : (
            <ul className="space-y-2">
              {aprobados.map((medico) => (
                <li
                  key={medico.id}
                  className="bg-green-600/10 border border-green-600/30 rounded-lg p-4 text-white"
                >
                  <p className="font-semibold">{medico.nombre}</p>
                  <p className="text-sm text-white/80">{medico.especialidad || "Área no especificada"}</p>
                  <p className="text-sm text-white/60">Email: {medico.email}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Pendientes</h3>
          {pendientes.length === 0 ? (
            <p className="text-white">No hay médicos pendientes.</p>
          ) : (
            <ul className="space-y-2">
              {pendientes.map((medico) => (
                <li
                  key={medico.id}
                  className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4 text-white"
                >
                  <p className="font-semibold">{medico.nombre}</p>
                  <p className="text-sm text-white/80">{medico.especialidad || "Área no especificada"}</p>
                  <p className="text-sm text-white/60">Email: {medico.email}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}