"use client";

import React from "react";

export default function FotoUpload({ onSelect }: { onSelect: (file: File) => void }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-neutral-700 mb-1">
        Foto de perfil
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) onSelect(file);
        }}
        className="block w-full border-2 border-neutral-300 rounded-lg px-4 py-2.5"
      />
    </div>
  );
}