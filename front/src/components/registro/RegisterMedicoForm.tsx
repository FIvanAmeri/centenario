"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import especialidades from "@/lib/especialidades/especialidades";
import FotoUpload from "@/components/ui/FotoUpload";
import useHorarioSelector, { BloqueHorario } from "@/hooks/HorarioSector/useHorarioSector";

type Horarios = Record<string, BloqueHorario[]>;

export default function RegisterMedicoForm() {
    const router = useRouter();
    
    const { horarios, agregarHorario, actualizarHorario, eliminarHorario } =
        useHorarioSelector() as { 
            horarios: Horarios; 
            agregarHorario: (dia: string) => void;
            actualizarHorario: (dia: string, index: number, campo: 'inicio' | 'fin', valor: string) => void;
            eliminarHorario: (dia: string, index: number) => void;
        };

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        dni: "",
        fechaNacimiento: "",
        especialidad: "",
        telefono: "",
        direccion: "",
        fotoPerfil: null as File | null,
        matricula: "",
        password: "",
        repetirPassword: "",
    });

    const [errores, setErrores] = useState<Record<string, string>>({});
    const [errorGlobal, setErrorGlobal] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, files } = target;

        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));

        setErrores((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorGlobal("");
        const nuevosErrores: Record<string, string> = {};

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

        const tieneHorarios = Object.values(horarios).some(
            (bloques) => bloques.length > 0
        );

        if (!nombre.trim()) nuevosErrores.nombre = "Este campo es obligatorio";
        if (!email.trim()) nuevosErrores.email = "Este campo es obligatorio";
        else if (!/^\S+@\S+\.\S+$/.test(email)) nuevosErrores.email = "Correo inválido";

        if (!dni.trim()) nuevosErrores.dni = "Este campo es obligatorio";
        else if (!/^\d{7,8}$/.test(dni)) nuevosErrores.dni = "DNI inválido";

        if (!fechaNacimiento.trim())
            nuevosErrores.fechaNacimiento = "Este campo es obligatorio";
        if (!especialidad.trim())
            nuevosErrores.especialidad = "Este campo es obligatorio";
        if (!telefono.trim()) nuevosErrores.telefono = "Este campo es obligatorio";
        if (!direccion.trim())
            nuevosErrores.direccion = "Este campo es obligatorio";
        if (!matricula.trim())
            nuevosErrores.matricula = "Este campo es obligatorio";
        if (!password.trim())
            nuevosErrores.password = "Este campo es obligatorio";
        if (!repetirPassword.trim())
            nuevosErrores.repetirPassword = "Este campo es obligatorio";
        if (password !== repetirPassword)
            nuevosErrores.repetirPassword = "Las contraseñas no coinciden";
        if (!fotoPerfil) nuevosErrores.fotoPerfil = "Debes subir una foto";
        if (!tieneHorarios)
            nuevosErrores.horarios = "Debes seleccionar al menos un horario";

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            setErrorGlobal("Completa todos los campos obligatorios");
            return;
        }

        const payload = new FormData();
        payload.append("nombre", nombre);
        payload.append("email", email);
        payload.append("dni", dni);
        payload.append("fechaNacimiento", fechaNacimiento);
        payload.append("especialidad", especialidad);
        payload.append("telefono", telefono);
        payload.append("direccion", direccion);
        payload.append("matricula", matricula);
        payload.append("password", password);
        payload.append("rol", "medico");
        payload.append("diasTrabajo", JSON.stringify(horarios));
        if (fotoPerfil) payload.append("fotoPerfil", fotoPerfil);

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
                    className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${errores.nombre
                        ? "border-red-500 focus:border-red-600"
                        : "border-neutral-300 focus:border-green-600"
                        } focus:outline-none`}
                />
                {errores.nombre && (
                    <p className="text-red-600 text-sm">{errores.nombre}</p>
                )}
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
                            className={`w-full rounded-lg border-2 px-4 py-2.5 shadow-inner transition ${errores[name]
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
                    className={`w-full rounded-lg border-2 px-4 py-2.5 bg-white shadow-inner transition ${errores.especialidad
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
                            className={`w-full rounded-lg border-2 px-4 py-2.5 shadow-inner transition ${errores[name]
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
