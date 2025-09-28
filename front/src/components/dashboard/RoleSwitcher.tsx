"use client";

import { useUser } from "@/hooks/dashboard/useUser";
import { useRouter } from "next/navigation";

export default function RoleSwitcher() {
  const { usuario, loading, error } = useUser();
  const router = useRouter();

  if (loading) return null;
  if (error || !usuario) return null;

  const cambiarVista = (rol: string) => {
    router.push(`/dashboard/${rol}`);
  };

  return (
    <div className="w-full p-4 bg-[var(--primary)] text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div>
        <h1 className="text-lg font-semibold">{usuario.nombre}</h1>
        <p className="text-sm">{usuario.email}</p>
      </div>
      <div className="flex gap-2">
        <span className="text-sm bg-white text-[var(--primary)] px-3 py-1 rounded-full font-medium">
          Rol actual: {usuario.rol}
        </span>
        {usuario.rol === "superadmin" && (
          <select
            onChange={(e) => cambiarVista(e.target.value)}
            className="text-sm px-2 py-1 rounded bg-white text-[var(--primary)]"
            defaultValue={usuario.rol}
          >
            <option value="superadmin">Superadmin</option>
            <option value="administrativo">Administrativo</option>
            <option value="medico">Médico</option>
          </select>
        )}
      </div>
    </div>
  );
}