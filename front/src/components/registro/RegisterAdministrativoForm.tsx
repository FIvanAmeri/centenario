"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormularioAdministrativo } from "@/hooks/registerAdministrativo/useFormularioAdministrativo";
import { useValidacionAdministrativo } from "@/hooks/registerAdministrativo/useValidacionAdministrativo";
import { FormularioCamposProps, CampoFotoProps, BotonSubmitProps } from "@/types/formTypes";

import dynamic from 'next/dynamic';

// Import components with no SSR
const FormularioCampos = dynamic<FormularioCamposProps>(
  () => import('@/components/registerAdministrativo/FormularioCampos'),
  { ssr: false }
);

const CampoFoto = dynamic<CampoFotoProps>(
  () => import('@/components/registerAdministrativo/CampoFoto'),
  { ssr: false }
);

const BotonSubmit = dynamic<BotonSubmitProps>(
  () => import('@/components/registerAdministrativo/BotonSubmit'),
  { ssr: false }
);

interface Props {
  onVolver: () => void;
}

export default function RegisterAdministrativoForm({ onVolver }: Props) {
  const router = useRouter();
  const {
    form,
    setForm,
    errores,
    setErrores,
    errorGlobal,
    setErrorGlobal,
    previewUrl,
    setPreviewUrl,
    loading,
    setLoading,
    handleChange,
    handleFileChange,
  } = useFormularioAdministrativo();

  const { validar } = useValidacionAdministrativo();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorGlobal("");
    setSuccessMsg(null);

    // Validate passwords match
    if (form.password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      return;
    }

    const nuevosErrores = validar(form);

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
    payload.append("telefono", form.telefono);
    payload.append("direccion", form.direccion);
    payload.append("password", form.password);
    payload.append("rol", "administrativo");
    
    if (form.fotoPerfil) {
      payload.append("fotoPerfil", form.fotoPerfil);
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register-administrativo`, {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrar el usuario administrativo");
      }

      setSuccessMsg("Registro exitoso. Serás redirigido al inicio de sesión.");
      setLoading(false);

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: Error) {
      console.error("Error al registrar:", error);
      setErrorGlobal(error.message || "Error de conexión con el servidor");
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleChange(e);
    
    // Clear confirm password error when password changes
    if (e.target.name === 'password' && confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (value !== form.password) {
      setConfirmPasswordError("Las contraseñas no coinciden");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-neutral-900">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre completo</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleFormChange}
          className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${
            errores.nombre
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-green-600"
          } focus:outline-none`}
        />
        {errores.nombre && <p className="text-red-600 text-sm">{errores.nombre}</p>}
      </div>

      <CampoFoto
        setForm={setForm}
        setPreviewUrl={setPreviewUrl}
        setErrores={setErrores}
        errores={errores}
        previewUrl={previewUrl}
      />

      <FormularioCampos 
        form={form} 
        errores={errores} 
        handleChange={handleFormChange} 
      />

      <div>
        <label className="block text-sm font-medium mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleFormChange}
          className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${
            errores.password
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-green-600"
          } focus:outline-none`}
        />
        {errores.password && <p className="text-red-600 text-sm">{errores.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${
            confirmPasswordError
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-green-600"
          } focus:outline-none`}
        />
        {confirmPasswordError && <p className="text-red-600 text-sm">{confirmPasswordError}</p>}
      </div>

      {errorGlobal && <p className="text-red-600 text-sm text-center">{errorGlobal}</p>}

      {successMsg && (
        <div className="rounded-md bg-green-50 border border-green-200 p-3 text-green-800">
          {successMsg}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <BotonSubmit loading={loading} disabled={!!confirmPasswordError || loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </BotonSubmit>
        <button
          type="button"
          onClick={onVolver}
          className="w-full bg-gray-500 text-white font-bold py-2.5 rounded-lg transition-all shadow hover:shadow-md hover:bg-gray-600"
          disabled={loading}
        >
          Volver a la selección de rol
        </button>
      </div>
    </form>
  );
}