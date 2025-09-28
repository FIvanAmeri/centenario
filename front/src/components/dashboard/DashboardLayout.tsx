"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { useUser } from "@/hooks/dashboard/useUser";
import { HiOutlineMenuAlt3, HiX, HiUserCircle } from "react-icons/hi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { usuario, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!usuario && !loading) {
      router.replace("/");
    }
  }, [usuario, loading]);

  return (
    <div className="min-h-screen w-full text-white font-[Inter]">
      <div className="flex">
        <Sidebar />

        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-white focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        {menuOpen && (
          <div className="fixed top-0 left-0 w-64 h-full bg-white/10 backdrop-blur-md shadow z-40 p-4">
            <Sidebar modoMovil />
          </div>
        )}

        <div className="flex-1 ml-64 p-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6 mb-8 transition-all duration-500 ease-in-out">
            <div className="flex justify-between items-center mb-2 border-b border-white/20 pb-2">
              <h1 className="text-2xl font-bold">Panel Superadmin</h1>
              {usuario && (
                <p className="text-sm text-white flex items-center">
                  <HiUserCircle className="text-white/70 text-lg mr-1" />
                  Bienvenido, <span className="font-semibold ml-1">{usuario.nombre}</span>
                </p>
              )}
            </div>
            <p className="text-white/90 text-sm">
              Sistema de gestión Centenario.
            </p>
          </div>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}