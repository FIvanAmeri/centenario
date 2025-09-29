"use client";
import React from "react";
import { FormularioMedico } from "@/types/medico";

interface Props {
  form: FormularioMedico;
  errores: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const camposPassword = [
  { name: "password", type: "password", placeholder: "Contraseña" },
  { name: "repetirPassword", type: "password", placeholder: "Repetir contraseña" },
];

export default function CamposPassword({ form, errores, handleChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {camposPassword.map(({ name, type, placeholder }) => (
        <div key={name}>
          <label className="block text-sm font-medium mb-1">{placeholder}</label>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={form[name as keyof FormularioMedico] as string}
            onChange={handleChange}
            className={`w-full rounded-lg border-2 px-4 py-2.5 shadow-inner transition ${
              errores[name]
                ? "border-red-500 focus:border-red-600"
                : "border-neutral-300 focus:border-green-600"
            } focus:outline-none`}
          />
          {errores[name] && (
            <p className="text-red-600 text-sm">{errores[name]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
