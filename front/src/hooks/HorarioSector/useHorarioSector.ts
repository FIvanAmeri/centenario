import { useState } from "react";

export type BloqueHorario = { inicio: string; fin: string };

const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

export default function useHorarioSelector() {
  const [horarios, setHorarios] = useState<Record<string, BloqueHorario[]>>(
    Object.fromEntries(dias.map((d) => [d, []]))
  );

  const agregarHorario = (dia: string) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: [...prev[dia], { inicio: "08:00", fin: "08:00" }],
    }));
  };

  const actualizarHorario = (
    dia: string,
    index: number,
    campo: "inicio" | "fin",
    valor: string
  ) => {
    setHorarios((prev) => {
      const copia = [...prev[dia]];
      copia[index] = { ...copia[index], [campo]: valor };
      return { ...prev, [dia]: copia };
    });
  };

  const eliminarHorario = (dia: string, index: number) => {
    setHorarios((prev) => {
      const copia = [...prev[dia]];
      copia.splice(index, 1);
      return { ...prev, [dia]: copia };
    });
  };

  return { horarios, agregarHorario, actualizarHorario, eliminarHorario };
}