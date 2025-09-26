"use client";

import { useState } from "react";

export default function FormularioReceta({ pacienteId }: { pacienteId: number }) {
  const [form, setForm] = useState({
    fecha: "",
    medicamentos: "",
    indicaciones: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setExito(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recetas`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pacienteId,
          medicamentos: form.medicamentos.split(",").map((m) => m.trim()),
        }),
      });

      if (!res.ok) throw new Error("Error al registrar receta");
      setExito(true);
      setForm({ fecha: "", medicamentos: "", indicaciones: "" });
    } catch {
      setError("No se pudo registrar la receta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-[var(--primary)]">Registrar receta médica</h2>

      <input
        type="date"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="text"
        name="medicamentos"
        placeholder="Medicamentos (separados por coma)"
        value={form.medicamentos}
        onChange={handleChange}
        required
        className="input"
      />
      <textarea
        name="indicaciones"
        placeholder="Indicaciones"
        value={form.indicaciones}
        onChange={handleChange}
        className="input"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-[var(--primary)] text-white px-4 py-2 rounded"
      >
        {loading ? "Registrando..." : "Registrar receta"}
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {exito && <p className="text-green-600">Receta registrada correctamente.</p>}
    </form>
  );
}