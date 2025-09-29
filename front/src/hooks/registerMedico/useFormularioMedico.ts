"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useHorarioSelector, { BloqueHorario } from "@/hooks/HorarioSector/useHorarioSector";

export type Horarios = Record<string, BloqueHorario[]>;

interface FormularioMedico {
  nombre: string;
  email: string;
  dni: string;
  fechaNacimiento: string;
  especialidad: string;
  telefono: string;
  direccion: string;
  fotoPerfil: File | null;
  matricula: string;
  password: string;
  repetirPassword: string;
}

export default function useFormularioMedico() {
  const router = useRouter();
  const { horarios, agregarHorario, actualizarHorario, eliminarHorario } =
    useHorarioSelector() as {
      horarios: Horarios;
      agregarHorario: (dia: string) => void;
      actualizarHorario: (dia: string, index: number, campo: "inicio" | "fin", valor: string) => void;
      eliminarHorario: (dia: string, index: number) => void;
    };

  const [form, setForm] = useState<FormularioMedico>({
    nombre: "",
    email: "",
    dni: "",
    fechaNacimiento: "",
    especialidad: "",
    telefono: "",
    direccion: "",
    fotoPerfil: null,
    matricula: "",
    password: "",
    repetirPassword: "",
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorGlobal, setErrorGlobal] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  return {
    form,
    setForm,
    errores,
    setErrores,
    errorGlobal,
    setErrorGlobal,
    previewUrl,
    setPreviewUrl,
    horarios,
    agregarHorario,
    actualizarHorario,
    eliminarHorario,
    handleChange,
    router,
  };
}
