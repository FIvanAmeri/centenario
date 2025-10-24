import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export interface Solicitud {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  especialidad: string[] | string | null;
  activo: boolean;
}

export default function useSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSolicitudes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/pendientes`, {
        credentials: 'include',
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status} ${res.statusText}. Detalle: ${errorText.substring(0, 100)}`);
      }
      setSolicitudes(await res.json() as Solicitud[]);
    } catch (error) {
      console.error("Error al obtener las solicitudes:", error);
      const errorMessage = error instanceof Error ? error.message : "Error al cargar datos.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  const manejarSolicitud = async (id: number, aprobado: boolean): Promise<boolean> => {
    try { 
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/aprobacion`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ aprobado }),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al procesar la solicitud");
      }
      setSolicitudes((prev) => prev.filter((s) => s.id !== id));
      toast.success(
        `La solicitud ha sido ${aprobado ? "aprobada" : "rechazada"}.`
      );
      return true;
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      toast.error("Ocurrió un error al procesar la solicitud.");
      setError("Ocurrió un error al procesar la solicitud.");
      return false;
    }
  };

  const aprobarSolicitud = (id: number) => {
    toast.info("¿Estás seguro de que deseas aprobar esta solicitud?", {
      action: {
        label: "Confirmar",
        onClick: () => manejarSolicitud(id, true),
      },
    });
  };

  const rechazarSolicitud = (id: number) => {
    toast.warning("¿Estás seguro de que deseas rechazar esta solicitud?", {
      action: {
        label: "Confirmar",
        onClick: () => manejarSolicitud(id, false),
      },
    });
  };

  return {
    solicitudes,
    isLoading,
    aprobarSolicitud,
    rechazarSolicitud,
    error,
    fetchSolicitudes,
  };
}