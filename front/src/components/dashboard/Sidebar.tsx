"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/dashboard/useUser";
import { useLogout } from "@/hooks/Cerrar/useLogout";
import {
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineEye,
  HiOutlineArchive,
} from "react-icons/hi";
import { JSX } from "react";

type RolType = "medico" | "administrativo" | "superadmin" | "";

export default function Sidebar({ modoMovil = false }: { modoMovil?: boolean }) {
  const { usuario, loading, error } = useUser();
  const { logout } = useLogout();
  const pathname = usePathname();

  const sidebarClasses = `fixed top-[50px] left-0 h-[calc(100vh-50px)] bg-transparent border-r border-white/20 z-50 w-60 sm:w-64 md:w-72 ${modoMovil ? "" : "hidden md:block"}`;

  if (loading || !usuario) {
    return (
      <aside className={`${sidebarClasses} p-6`}>
        <div className={`text-sm ${error ? "text-red-400" : "text-white/50"}`}>
          {error ? "Sesión expirada o error de carga." : "Cargando menú..."}
        </div>
      </aside>
    );
  }

  const base = "/dashboard";
  const rolFromUser = usuario.rol as string | undefined | null;
  const rol: RolType = (rolFromUser ? rolFromUser.toLowerCase() : "") as RolType;

  const items: { label: string; href: string; icon: JSX.Element }[] = [];

  if (rol === "administrativo") {
    items.push(
      { label: "Pacientes", href: `${base}/administrativo/pacientes`, icon: <HiOutlineUserGroup /> },
      { label: "Turnos", href: `${base}/administrativo/turnos`, icon: <HiOutlineClipboardList /> },
      { label: "Recetas", href: `${base}/administrativo/recetas`, icon: <HiOutlineDocumentText /> },
      { label: "Estadísticas", href: `${base}/administrativo/estadisticas`, icon: <HiOutlineChartBar /> }
    );
  }

  if (rol === "medico") {
    items.push(
      { label: "Mis Pacientes", href: `${base}/medico/pacientes`, icon: <HiOutlineUserGroup /> },
      { label: "Mis Turnos", href: `${base}/medico/turnos`, icon: <HiOutlineClipboardList /> },
      { label: "Recetas", href: `${base}/medico/recetas`, icon: <HiOutlineDocumentText /> }
    );
  }

  if (rol === "superadmin") {
    items.push(
      { label: "Gestión", href: `${base}/superadmin`, icon: <HiOutlineCog /> },
      { label: "Estadísticas", href: `${base}/superadmin/estadisticas`, icon: <HiOutlineChartBar /> },
      { label: "Solicitudes", href: `${base}/superadmin/solicitudes`, icon: <HiOutlineEye /> },
      { label: "Historial de solicitudes", href: `${base}/superadmin/historial`, icon: <HiOutlineArchive /> }
    );
  }

  return (
    <aside className={sidebarClasses}>
      <div className="h-full flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 flex flex-col gap-1 pt-4">
            {items.map(({ label, href, icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    active ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 flex flex-col items-center gap-2">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-red-400 transition"
          >
            <HiOutlineLogout className="text-lg" />
            Cerrar sesión
          </button>
          <div className="text-xs text-white/60 text-center">
            Gestión Centenario © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </aside>
  );
}   