"use client";
import React from "react";
import { BloqueHorario } from "@/hooks/HorarioSector/useHorarioSector";

interface Props {
  horarios: Record<string, BloqueHorario[]>;
  actualizarHorario: (dia: string, i: number, campo: "inicio" | "fin", valor: string) => void;
  eliminarHorario: (dia: string, i: number) => void;
  agregarHorario: (dia: string) => void;
}

export default function CamposAgenda({
  horarios,
  actualizarHorario,
  eliminarHorario,
  agregarHorario,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Agenda de trabajo</label>
      {(Object.entries(horarios) as [string, BloqueHorario[]][]).map(([dia, bloques]) => (
        <div key={dia} className="mb-4">
          <h4 className="font-semibold capitalize mb-2">{dia}</h4>
          {bloques.map((bloque, i: number) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input
                type="time"
                value={bloque.inicio}
                onChange={(e) => actualizarHorario(dia, i, "inicio", e.target.value)}
                className="border rounded p-1"
                min="00:00"
                max="23:00"
                step="3600"
              />
              <input
                type="time"
                value={bloque.fin}
                onChange={(e) => actualizarHorario(dia, i, "fin", e.target.value)}
                className="border rounded p-1"
                min="00:00"
                max="23:00"
                step="3600"
              />
              <button
                type="button"
                onClick={() => eliminarHorario(dia, i)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => agregarHorario(dia)}
            className="text-sm text-green-600 hover:underline"
          >
            + Agregar horario
          </button>
        </div>
      ))}
    </div>
  );
}
