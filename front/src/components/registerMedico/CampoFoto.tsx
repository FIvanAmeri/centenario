"use client";
import React from "react";
import FotoUpload from "@/components/ui/FotoUpload";
import { FormularioMedico } from "@/types/medico";

interface Props {
  setForm: React.Dispatch<React.SetStateAction<FormularioMedico>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setErrores: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errores: Record<string, string>;
  previewUrl: string | null;
}

export default function CampoFoto({
  setForm,
  setPreviewUrl,
  setErrores,
  errores,
  previewUrl,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <FotoUpload
        onSelect={(file: File) => {
          setForm((prev: FormularioMedico) => ({
            ...prev,
            fotoPerfil: file,
          }));
          setPreviewUrl(URL.createObjectURL(file));
          setErrores((prev) => ({ ...prev, fotoPerfil: "" }));
        }}
      />
      {errores.fotoPerfil && (
        <p className="text-red-600 text-sm mt-1">{errores.fotoPerfil}</p>
      )}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Vista previa"
          className="mt-2 h-24 w-24 object-cover rounded-full border-2 border-green-600 shadow-md"
        />
      )}
    </div>
  );
}
