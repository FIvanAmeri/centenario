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
} from "react-icons/hi";
import { JSX } from "react";

export default function Sidebar({ modoMovil = false }: { modoMovil?: boolean }) {
  const { usuario, loading, error } = useUser();
  const { logout } = useLogout();
  const pathname = usePathname();

  if (loading) return <div className="p-4 text-sm text-white">Cargando menú...</div>;
  if (error || !usuario) return <div className="p-4 text-sm text-red-400">No se pudo cargar el menú</div>;

  const base = "/dashboard";
  const rol = usuario.rol;

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
      { label: "Gestión", href: `${base}/superadmin/gestion`, icon: <HiOutlineCog /> },
      { label: "Estadísticas", href: `${base}/superadmin/estadisticas`, icon: <HiOutlineChartBar /> }
    );
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-transparent border-r border-white/20 z-50 ${
        modoMovil ? "" : "hidden md:block"
      }`}
    >
      <div className="h-full flex flex-col justify-between">
        <nav className="p-6 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-white mb-4">Menú Principal</h2>
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
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Botón institucional de cierre de sesión */}
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