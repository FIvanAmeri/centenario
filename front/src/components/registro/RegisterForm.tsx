"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterMedicoForm from "./RegisterMedicoForm";
import RegisterAdministrativoForm from "./RegisterAdministrativoForm";

export default function RegisterForm() {
  const [rol, setRol] = useState("");
  const router = useRouter();

  const handleVolver = () => {
    setRol("");
  };

  return (
    <div className="space-y-6">
      {!rol && (
        <div className="space-y-6">
          <div>
            <label htmlFor="rol" className="block text-sm font-semibold text-neutral-900 mb-1">
              Selecciona el tipo de usuario
            </label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="block w-full rounded-lg border-2 border-neutral-300 px-4 py-2.5 bg-white text-neutral-900 shadow-inner focus:border-green-600 focus:ring-green-600 focus:outline-none transition duration-200"
            >
              <option value="">-- Seleccionar --</option>
              <option value="medico">Médico</option>
              <option value="administrativo">Administrativo</option>
            </select>
          </div>

          <p
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => router.push("/")}
          >
            Volver atrás
          </p>
        </div>
      )}

      {rol === "medico" && <RegisterMedicoForm onVolver={handleVolver} />}
      {rol === "administrativo" && <RegisterAdministrativoForm onVolver={handleVolver} />}
    </div>
  );
}