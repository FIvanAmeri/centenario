import { FormularioAdministrativo } from "@/hooks/registerAdministrativo/useFormularioAdministrativo";

interface FormularioCamposProps {
  form: FormularioAdministrativo;
  errores: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function FormularioCampos({ form, errores, handleChange }: FormularioCamposProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${
            errores.email
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-green-600"
          } focus:outline-none`}
        />
        {errores.email && <p className="text-red-600 text-sm">{errores.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">DNI</label>
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={form.dni}
          onChange={handleChange}
          maxLength={8}
          className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${
            errores.dni
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-green-600"
          } focus:outline-none`}
        />
        {errores.dni && <p className="text-red-600 text-sm">{errores.dni}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
          className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${
            errores.fechaNacimiento
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-green-600"
          } focus:outline-none`}
        />
        {errores.fechaNacimiento && (
          <p className="text-red-600 text-sm">{errores.fechaNacimiento}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Teléfono</label>
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${
            errores.telefono
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-green-600"
          } focus:outline-none`}
        />
        {errores.telefono && <p className="text-red-600 text-sm">{errores.telefono}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dirección</label>
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          className={`w-full rounded-lg border-2 px-4 py-3 text-lg shadow-inner transition ${
            errores.direccion
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-green-600"
          } focus:outline-none`}
        />
        {errores.direccion && <p className="text-red-600 text-sm">{errores.direccion}</p>}
      </div>
    </div>
  );
}
