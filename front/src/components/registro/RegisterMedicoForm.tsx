"use client";

import React from "react";
import useFormularioMedico from "@/hooks/registerMedico/useFormularioMedico";
import useValidacionMedico from "@/hooks/registerMedico/useValidacionMedico";

import FormularioCampos from "@/components/registerMedico/FormularioCampos";
import CampoFoto from "@/components/registerMedico/CampoFoto";
import CampoEspecialidad from "@/components/registerMedico/CampoEspecialidad";
import CamposAgenda from "@/components/registerMedico/CamposAgenda";
import CamposPassword from "@/components/registerMedico/CamposPassword";
import BotonSubmit from "@/components/registerMedico/BotonSubmit";

// Declaramos los props del componente
interface Props {
  onVolver: () => void;
}

export default function RegisterMedicoForm({ onVolver }: Props) {
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
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium mb-1">Nombre completo</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
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

      {/* Foto */}
      <CampoFoto
        setForm={setForm}
        setPreviewUrl={setPreviewUrl}
        setErrores={setErrores}
        errores={errores}
        previewUrl={previewUrl}
      />

      {/* Campos */}
      <FormularioCampos form={form} errores={errores} handleChange={handleChange} />

      {/* Especialidad */}
      <CampoEspecialidad
        value={form.especialidad}
        errores={errores}
        handleChange={handleChange}
      />

      {/* Agenda */}
      <CamposAgenda
        horarios={horarios}
        actualizarHorario={actualizarHorario}
        eliminarHorario={eliminarHorario}
        agregarHorario={agregarHorario}
      />

      {/* Password */}
      <CamposPassword form={form} errores={errores} handleChange={handleChange} />

      {errores.horarios && (
        <p className="text-red-600 text-sm text-center">{errores.horarios}</p>
      )}
      {errorGlobal && <p className="text-red-600 text-sm text-center">{errorGlobal}</p>}

      {/* Botón de enviar */}
      <BotonSubmit />

      {/* Botón para volver a la selección de rol */}
      <button
        type="button"
        onClick={onVolver}
        className="w-full bg-gray-500 text-white font-bold py-2.5 rounded-lg transition-all shadow hover:shadow-md hover:bg-gray-600"
      >
        Volver a la selección de rol
      </button>
    </form>
  );
}
