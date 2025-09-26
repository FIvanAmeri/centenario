"use client";
import React from "react";

export default function LoginForm() {
  return (
    <div className="w-full">
      {/* Título */}
      <h1 className="text-3xl font-extrabold text-center text-neutral-800 mb-8">
        Iniciar Sesión
      </h1>

      {/* Formulario */}
      <form className="space-y-6">
        {/* Correo Electrónico */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-neutral-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="usuario@hospital.gob.ar"
            className="block w-full rounded-lg border-2 border-neutral-300 px-4 py-2.5 text-neutral-900 shadow-inner focus:border-green-600 focus:ring-green-600 focus:outline-none transition duration-200"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-neutral-700 mb-1"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="block w-full rounded-lg border-2 border-neutral-300 px-4 py-2.5 text-neutral-900 shadow-inner focus:border-green-600 focus:ring-green-600 focus:outline-none transition duration-200"
          />
        </div>

        {/* Botón Principal */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          Acceder
        </button>
      </form>

      {/* Registro */}
      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-500 mb-4">¿No tienes cuenta?</p>
        <button
          type="button"
          className="w-full bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-2.5 px-4 rounded-lg transition-all"
        >
          Regístrate
        </button>
      </div>
    </div>
  );
}
