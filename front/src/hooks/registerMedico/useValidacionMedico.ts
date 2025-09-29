"use client";

import { Horarios } from "./useFormularioMedico";

interface DatosFormulario {
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

export default function useValidacionMedico() {
  const validar = (form: DatosFormulario, horarios: Horarios) => {
    const errores: Record<string, string> = {};
    const {
      nombre,
      email,
      dni,
      fechaNacimiento,
      especialidad,
      telefono,
      direccion,
      fotoPerfil,
      matricula,
      password,
      repetirPassword,
    } = form;

    const tieneHorarios = Object.values(horarios).some((bloques) => bloques.length > 0);

    if (!nombre.trim()) errores.nombre = "Este campo es obligatorio";
    if (!email.trim()) errores.email = "Este campo es obligatorio";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errores.email = "Correo inválido";

    if (!dni.trim()) errores.dni = "Este campo es obligatorio";
    else if (!/^\d{7,8}$/.test(dni)) errores.dni = "DNI inválido";

    if (!fechaNacimiento.trim()) errores.fechaNacimiento = "Este campo es obligatorio";
    if (!especialidad.trim()) errores.especialidad = "Este campo es obligatorio";
    if (!telefono.trim()) errores.telefono = "Este campo es obligatorio";
    if (!direccion.trim()) errores.direccion = "Este campo es obligatorio";
    if (!matricula.trim()) errores.matricula = "Este campo es obligatorio";
    if (!password.trim()) errores.password = "Este campo es obligatorio";
    if (!repetirPassword.trim()) errores.repetirPassword = "Este campo es obligatorio";
    if (password !== repetirPassword) errores.repetirPassword = "Las contraseñas no coinciden";
    if (!fotoPerfil) errores.fotoPerfil = "Debes subir una foto";
    if (!tieneHorarios) errores.horarios = "Debes seleccionar al menos un horario";

    return errores;
  };

  return { validar };
}
