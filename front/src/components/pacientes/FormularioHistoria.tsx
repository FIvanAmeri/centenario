"use client";

import { useState } from "react";

export default function FormularioHistoria({ pacienteId }: { pacienteId: number }) {
  const [form, setForm] = useState({
    fecha: "",
    motivo: "",
    diagnostico: "",
    observaciones: "",
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/historia`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, pacienteId }),
      });

      if (!res.ok) throw new Error("Error al registrar historia clínica");
      setExito(true);
      setForm({ fecha: "", motivo: "", diagnostico: "", observaciones: "" });
    } catch {
      setError("No se pudo registrar la historia clínica");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-[var(--primary)]">Registrar historia clínica</h2>

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
        name="motivo"
        placeholder="Motivo de consulta"
        value={form.motivo}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="text"
        name="diagnostico"
        placeholder="Diagnóstico"
        value={form.diagnostico}
        onChange={handleChange}
        required
        className="input"
      />
      <textarea
        name="observaciones"
        placeholder="Observaciones"
        value={form.observaciones}
        onChange={handleChange}
        className="input"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-[var(--primary)] text-white px-4 py-2 rounded"
      >
        {loading ? "Registrando..." : "Registrar historia"}
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {exito && <p className="text-green-600">Historia registrada correctamente.</p>}
    </form>
  );
}