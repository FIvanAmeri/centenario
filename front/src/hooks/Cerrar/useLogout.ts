"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.clear();
      sessionStorage.clear();

      console.log("🚪 Sesión cerrada");
      router.replace("/");
    } catch (err) {
      console.error("💥 Error al cerrar sesión:", err);
    }
  };

  return { logout };
}