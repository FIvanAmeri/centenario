"use client";

import { useState, useEffect } from "react";
import { Paciente } from "@/hooks/pacientes/usePacientes";
import { useActualizarPaciente } from "@/hooks/pacientes/useActualizarPaciente";
import countries from "@/lib/paises";

interface Props {
  paciente: Paciente;
  onClose: () => void;
  onSuccess?: () => void;
}

const provincias = ["Santa Fe", "Buenos Aires", "Córdoba"];
const ciudades = ["Rosario", "Santa Fe Capital", "Villa María"];
const barriosRosario = [
  "Centro",
  "Echesortu",
  "Fisherton",
  "Alberdi",
  "Belgrano",
  "Las Delicias",
  "Tiro Suizo",
  "Ludueña",
  "Empalme Graneros",
  "Refinería",
  "Martin",
  "Arroyito",
  "Hostal del Sol",
];

export default function ModalEditarPaciente({ paciente, onClose, onSuccess }: Props) {
  const { actualizarPaciente, loading, error, exito } = useActualizarPaciente();

  const [form, setForm] = useState<Omit<Paciente, "id">>({
    nombre: "",
    dni: "",
    fechaNacimiento: "",
    telefono: "",
    correo: "",
    direccion: {
      pais: "",
      provincia: "",
      ciudad: "",
      barrio: "",
      calle: "",
    },
  });

  useEffect(() => {
    const { id, ...rest } = paciente;
    setForm(rest);
  }, [paciente]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      ["pais", "provincia", "ciudad", "barrio", "calle"].includes(name)
    ) {
      setForm({
        ...form,
        direccion: {
          ...form.direccion,
          [name]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await actualizarPaciente(paciente.id, form);
    if (onSuccess && exito) onSuccess();
  };

  const esArgentino = form.direccion.pais === "Argentina";
  const esRosario = form.direccion.ciudad === "Rosario";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-2xl space-y-4"
      >
        <h2 className="text-xl font-semibold text-[var(--primary)]">
          Editar paciente
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="dni"
            value={form.dni}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="input"
          />
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="input"
          />

          <input
            list="paises"
            name="pais"
            value={form.direccion.pais}
            onChange={handleChange}
            required
            className="input"
          />
          <datalist id="paises">
            {countries.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>

          <select
            name="provincia"
            value={form.direccion.provincia}
            onChange={handleChange}
            disabled={!esArgentino}
            required={esArgentino}
            className="input"
          >
            <option value="">Seleccionar provincia</option>
            {provincias.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            name="ciudad"
            value={form.direccion.ciudad}
            onChange={handleChange}
            disabled={!esArgentino}
            required={esArgentino}
            className="input"
          >
            <option value="">Seleccionar ciudad</option>
            {ciudades.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {esRosario ? (
            <select
              name="barrio"
              value={form.direccion.barrio}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Seleccionar barrio</option>
              {barriosRosario.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name="barrio"
              placeholder="Barrio"
              value={form.direccion.barrio}
              onChange={handleChange}
              required
              className="input"
            />
          )}

          <input
            type="text"
            name="calle"
            value={form.direccion.calle}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div className="flex justify-between items-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary)] text-white px-4 py-2 rounded"
          >
            {loading ? "Actualizando..." : "Guardar cambios"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--primary)] underline"
          >
            Cancelar
          </button>
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {exito && <p className="text-green-600">Paciente actualizado.</p>}
      </form>
    </div>
  );
}