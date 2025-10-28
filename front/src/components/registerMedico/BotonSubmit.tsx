"use client";
import React from "react";

interface Props {
  loading?: boolean;
}

export default function BotonSubmit({ loading = false }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full bg-green-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl 
        ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Registrando...
        </span>
      ) : (
        "Registrar Médico"
      )}
    </button>
  );
}
