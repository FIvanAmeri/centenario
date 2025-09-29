"use client";

import { useEffect, useState, useRef } from "react";
import { UserResponseDto } from "@/types/UserResponseDto";
import { HiEye, HiX } from "react-icons/hi";

export default function SolicitudesMedico() {
  const [pendientes, setPendientes] = useState<UserResponseDto[]>([]);
  const [seleccionado, setSeleccionado] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const cargarSolicitudes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const data: UserResponseDto[] = await res.json();
      const filtrados = data.filter((u) => u.rol === "medico" && u.activo === false);
      setPendientes(filtrados);
    } catch (err) {
      setError("No se pudieron cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  const manejarAccion = async (id: number, activar: boolean) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/${activar ? "activar" : "desactivar"}`;
      const res = await fetch(endpoint, { method: "PATCH" });
      if (!res.ok) throw new Error("Error en la acción");
      setPendientes((prev) => prev.filter((u) => u.id !== id));
      setSeleccionado(null);
    } catch {
      setError("No se pudo actualizar el estado del médico");
    }
  };

  const cerrarModal = () => setSeleccionado(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        cerrarModal();
      }
    };
    if (seleccionado) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [seleccionado]);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  return (
    <div className="relative">
      <h2 className="text-xl font-bold mb-4 text-white">Solicitudes de médicos</h2>
      {loading && <p className="text-white">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {pendientes.length === 0 && !loading && <p className="text-white">No hay solicitudes pendientes.</p>}

      <ul className="space-y-4">
        {pendientes.map((medico) => (
          <li
            key={medico.id}
            className="bg-white/10 border border-white/20 rounded-lg p-4 text-white flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg flex items-center gap-2">
                <button
                  onClick={() => setSeleccionado(medico)}
                  className="hover:underline focus:outline-none"
                >
                  {medico.nombre}
                </button>
                <HiEye className="text-white/70" size={20} />
              </p>
              <p className="text-sm text-white/80">{medico.especialidad || "Área no especificada"}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => manejarAccion(medico.id, true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Aceptar
              </button>
              <button
                onClick={() => manejarAccion(medico.id, false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Denegar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {seleccionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white text-black rounded-xl p-6 w-full max-w-md relative shadow-xl"
          >
            <button
              onClick={cerrarModal}
              className="absolute top-4 right-4 text-black hover:text-red-600 transition"
            >
              <HiX size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">Información del médico</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Nombre:</strong> {seleccionado.nombre}</p>
              <p><strong>Email:</strong> {seleccionado.email}</p>
              <p><strong>Especialidad:</strong> {seleccionado.especialidad || "No especificada"}</p>
              <p><strong>Rol:</strong> {seleccionado.rol}</p>
              <p><strong>Estado:</strong> Pendiente de aprobación</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => manejarAccion(seleccionado.id, true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Aceptar
              </button>
              <button
                onClick={() => manejarAccion(seleccionado.id, false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Denegar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}