"use client";

import { useState } from "react";
import { useCrearPaciente } from "@/hooks/pacientes/useCrearPaciente";
import countries from "@/lib/paises"; // lista de países

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

export default function FormularioPaciente() {
  const { crearPaciente, loading, error, exito } = useCrearPaciente();

  const [form, setForm] = useState({
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
    await crearPaciente(form);
  };

  const esArgentino = form.direccion.pais === "Argentina";
  const ciudadSeleccionada = form.direccion.ciudad;
  const esRosario = ciudadSeleccionada === "Rosario";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-[var(--primary)]">
        Registrar nuevo paciente
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
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
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="input"
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
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
          placeholder="País"
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
          placeholder="Calle"
          value={form.direccion.calle}
          onChange={handleChange}
          required
          className="input"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[var(--primary)] text-white px-4 py-2 rounded"
      >
        {loading ? "Registrando..." : "Registrar paciente"}
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {exito && (
        <p className="text-green-600">Paciente registrado correctamente.</p>
      )}
    </form>
  );
}