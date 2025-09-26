"use client";

export async function descargarPDFHistoria(pacienteId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/historia/${pacienteId}/pdf`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("No se pudo descargar la historia clínica");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `historia_${pacienteId}.pdf`;
  link.click();
  window.URL.revokeObjectURL(url);
}

export async function descargarPDFRecetas(pacienteId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recetas/${pacienteId}/pdf`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("No se pudo descargar las recetas");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `recetas_${pacienteId}.pdf`;
  link.click();
  window.URL.revokeObjectURL(url);
}