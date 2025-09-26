"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/dashboard/useUser";
import {
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineCog,
} from "react-icons/hi";
import { JSX } from "react";

export default function Sidebar() {
  const { usuario, loading } = useUser();
  const pathname = usePathname();

  if (loading || !usuario) return null;

  const base = "/dashboard";
  const rol = usuario.rol;

  const items: { label: string; href: string; icon: JSX.Element }[] = [];

  if (rol === "administrativo") {
    items.push(
      {
        label: "Pacientes",
        href: `${base}/administrativo/pacientes`,
        icon: <HiOutlineUserGroup />,
      },
      {
        label: "Turnos",
        href: `${base}/administrativo/turnos`,
        icon: <HiOutlineClipboardList />,
      },
      {
        label: "Recetas",
        href: `${base}/administrativo/recetas`,
        icon: <HiOutlineDocumentText />,
      },
      {
        label: "Estadísticas",
        href: `${base}/administrativo/estadisticas`,
        icon: <HiOutlineChartBar />,
      }
    );
  }

  if (rol === "medico") {
    items.push(
      {
        label: "Mis Pacientes",
        href: `${base}/medico/pacientes`,
        icon: <HiOutlineUserGroup />,
      },
      {
        label: "Mis Turnos",
        href: `${base}/medico/turnos`,
        icon: <HiOutlineClipboardList />,
      },
      {
        label: "Recetas",
        href: `${base}/medico/recetas`,
        icon: <HiOutlineDocumentText />,
      }
    );
  }

  if (rol === "superadmin") {
    items.push(
      {
        label: "Gestión",
        href: `${base}/superadmin/gestion`,
        icon: <HiOutlineCog />,
      },
      {
        label: "Estadísticas",
        href: `${base}/superadmin/estadisticas`,
        icon: <HiOutlineChartBar />,
      }
    );
  }

  return (
    <aside className="w-64 bg-white shadow h-screen p-4 hidden md:block">
      <nav className="flex flex-col gap-4">
        {items.map(({ label, href, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded ${
                active
                  ? "bg-[var(--primary)] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}