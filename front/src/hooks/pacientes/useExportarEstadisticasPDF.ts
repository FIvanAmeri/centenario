"use client";

export async function descargarPDFEstadisticas(pacienteId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/estadisticas/${pacienteId}/pdf`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("No se pudo descargar el PDF de estadísticas");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `estadisticas_${pacienteId}.pdf`;
  link.click();
  window.URL.revokeObjectURL(url);
}