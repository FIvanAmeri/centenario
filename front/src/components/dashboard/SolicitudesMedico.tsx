"use client";

import { useEffect, useState, useRef } from "react";
import { UserResponseDto } from "@/types/UserResponseDto";
import { HiEye, HiX, HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function SolicitudesMedico() {
  const [pendientes, setPendientes] = useState<UserResponseDto[]>([]);
  const [seleccionado, setSeleccionado] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  const formatUserDetail = (usuario: UserResponseDto): string => {
    if (usuario.rol === 'medico') {
      if (Array.isArray(usuario.especialidad) && usuario.especialidad.length > 0) {
        return usuario.especialidad.join(', ');
      }
      return "Especialidad no especificada";
    }
    return `Rol: ${usuario.rol}`;
  };

  const cargarSolicitudes = async () => {
    setLoading(true);
    setErrorApi(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/pendientes`, {
        credentials: 'include', 
      });

      if (!res.ok) {
        throw new Error("No se pudieron cargar las solicitudes.");
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setPendientes(data as UserResponseDto[]);
      } else {
        setPendientes([]);
      }
    } catch (error) {
      setErrorApi(error instanceof Error ? error.message : "Error al cargar datos.");
      setPendientes([]);
    } finally {
      setLoading(false);
    }
  };

  const manejarAccion = async (id: number, aprobado: boolean) => {
    setErrorApi(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/aprobacion`, {
        method: "PATCH",
        credentials: 'include', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aprobado }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al procesar la solicitud");
      }
      setPendientes((prev) => prev.filter((u) => u.id !== id));
      setSeleccionado(null);
    } catch (error) {
      setErrorApi(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
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
      <h2 className="text-xl font-bold mb-4 text-white">Solicitudes de registro</h2>
      {loading && <p className="text-white">Cargando...</p>}
      {errorApi && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-sm">{errorApi}</div>}
      
      {pendientes.length === 0 && !loading && !errorApi && (
        <div className="bg-white/10 border border-white/20 rounded-lg p-4 text-white text-sm italic">
          No hay solicitudes pendientes en este momento.
        </div>
      )}

      <ul className="space-y-4 mt-4">
        {pendientes.map((usuario) => (
          <li
            key={usuario.id}
            className="bg-white/10 border border-white/20 rounded-lg p-4 text-white flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg flex items-center gap-2">
                <button
                  onClick={() => setSeleccionado(usuario)}
                  className="hover:underline focus:outline-none"
                >
                  {usuario.nombre}
                </button>
                <HiEye className="text-white/70" size={20} />
              </p>
              <p className="text-sm text-white/80">
                  {formatUserDetail(usuario)}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => manejarAccion(usuario.id, true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
              >
                <HiCheckCircle /> Aceptar
              </button>
              <button
                onClick={() => manejarAccion(usuario.id, false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
              >
                <HiXCircle /> Denegar
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
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
            >
              <HiX size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">Información del usuario</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Nombre:</strong> {seleccionado.nombre}</p>
              <p><strong>Email:</strong> {seleccionado.email}</p>
              <p><strong>Rol:</strong> {seleccionado.rol}</p>
              {seleccionado.rol === 'medico' && (
                <p><strong>Especialidad:</strong> {formatUserDetail(seleccionado)}</p>
              )}
              <p><strong>Estado:</strong> Pendiente de aprobación</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => manejarAccion(seleccionado.id, true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
              >
                <HiCheckCircle /> Aceptar
              </button>
              <button
                onClick={() => manejarAccion(seleccionado.id, false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
              >
                <HiXCircle /> Denegar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}