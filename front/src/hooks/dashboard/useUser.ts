"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: "administrativo" | "medico" | "superadmin"; 
  especialidad: string | null;
  activo: boolean;
}


export function useUser() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          method: "GET",
          credentials: "include", 
        });

        if (!res.ok) {
          console.error("❌ /auth/me devolvió:", res.status);
          
   
          if (res.status === 401 || res.status === 403 || res.status === 404) { 
            setError("Sesión expirada o no válida. Redirigiendo...");
            router.push('/'); 
            return; 
          }

          throw new Error("No se pudo obtener el usuario");
        }

        const data: Usuario = await res.json();
        console.log("🧑 Usuario cargado:", data);
        setUsuario(data);
      } catch (err) {
        console.error("💥 Error al cargar el usuario:", err);
        setError("Error al cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [router]); 

  return { usuario, loading, error };
}