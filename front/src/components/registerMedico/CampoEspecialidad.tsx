"use client";

import React from "react";
import especialidades from "@/lib/especialidades/especialidades";
import { FormularioMedico } from "@/types/medico";

interface Props {
  value: FormularioMedico["especialidad"];
  errores: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function CampoEspecialidad({ value, errores, handleChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Especialidad</label>
      <select
        name="especialidad"
        value={value}
        onChange={handleChange}
        className={`w-full rounded-lg border-2 px-4 py-2.5 bg-white shadow-inner transition ${
          errores.especialidad
            ? "border-red-500 focus:border-red-600"
            : "border-neutral-300 focus:border-green-600"
        } focus:outline-none`}
      >
        <option value="">Selecciona una especialidad</option>
        {especialidades.map((esp: string) => (
          <option key={esp} value={esp}>
            {esp}
          </option>
        ))}
      </select>
      {errores.especialidad && (
        <p className="text-red-600 text-sm">{errores.especialidad}</p>
      )}
    </div>
  );
}