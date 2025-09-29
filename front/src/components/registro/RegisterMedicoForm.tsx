"use client";

import React from "react";
import especialidades from "@/lib/especialidades/especialidades";
import FotoUpload from "@/components/ui/FotoUpload";
import useFormularioMedico from "@/hooks/registerMedico/useFormularioMedico";
import useValidacionMedico from "@/hooks/registerMedico/useValidacionMedico";
import { BloqueHorario } from "@/hooks/HorarioSector/useHorarioSector";

export default function RegisterMedicoForm() {
  const {
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
  } = useFormularioMedico();

  const { validar } = useValidacionMedico();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorGlobal("");

    const nuevosErrores = validar(form, horarios);

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setErrorGlobal("Completa todos los campos obligatorios");
      return;
    }

    const payload = new FormData();
    payload.append("nombre", form.nombre);
    payload.append("email", form.email);
    payload.append("dni", form.dni);
    payload.append("fechaNacimiento", form.fechaNacimiento);
    payload.append("especialidad", form.especialidad);
    payload.append("telefono", form.telefono);
    payload.append("direccion", form.direccion);
    payload.append("matricula", form.matricula);
    payload.append("password", form.password);
    payload.append("rol", "medico");
    payload.append("diasTrabajo", JSON.stringify(horarios));
    if (form.fotoPerfil) payload.append("fotoPerfil", form.fotoPerfil);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const { message } = await res.json();
        setErrorGlobal(message || "Error al registrar médico");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error("💥 Error de conexión:", err);
      setErrorGlobal("Error de conexión con el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-neutral-900">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre completo</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${
            errores.nombre
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-green-600"
          } focus:outline-none`}
        />
        {errores.nombre && <p className="text-red-600 text-sm">{errores.nombre}</p>}
      </div>

      <div className="flex flex-col items-center">
        <FotoUpload
          onSelect={(file: File) => {
            setForm((prev) => ({ ...prev, fotoPerfil: file }));
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "email", type: "email", placeholder: "Correo" },
          { name: "dni", type: "text", placeholder: "DNI" },
          { name: "fechaNacimiento", type: "date", placeholder: "Fecha de Nacimiento" },
          { name: "telefono", type: "text", placeholder: "Teléfono" },
          { name: "direccion", type: "text", placeholder: "Dirección" },
          { name: "matricula", type: "text", placeholder: "N° Matrícula" },
        ].map(({ name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {placeholder || name}
            </label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name as keyof typeof form] as string}
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

      <div>
        <label className="block text-sm font-medium mb-1">Especialidad</label>
        <select
          name="especialidad"
          value={form.especialidad}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "password", type: "password", placeholder: "Contraseña" },
          {
            name: "repetirPassword",
            type: "password",
            placeholder: "Repetir contraseña",
          },
        ].map(({ name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">
              {placeholder}
            </label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name as keyof typeof form] as string}
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

      {errores.horarios && (
        <p className="text-red-600 text-sm text-center">{errores.horarios}</p>
      )}
      {errorGlobal && (
        <p className="text-red-600 text-sm text-center">{errorGlobal}</p>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
      >
        Registrar Médico
      </button>
    </form>
  );
}
