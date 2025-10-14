import { FormularioAdministrativo } from "@/hooks/registerAdministrativo/useFormularioAdministrativo";

interface CampoFotoProps {
  setForm: React.Dispatch<React.SetStateAction<FormularioAdministrativo>>;
  setPreviewUrl: (url: string | null) => void;
  setErrores: (errores: Record<string, string>) => void;
  errores: Record<string, string>;
  previewUrl: string | null;
}

export default function CampoFoto({
  setForm,
  setPreviewUrl,
  setErrores,
  errores,
  previewUrl,
}: CampoFotoProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrores({
          ...errores,
          fotoPerfil: 'Por favor sube un archivo de imagen válido'
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrores({
          ...errores,
          fotoPerfil: 'La imagen no puede pesar más de 5MB'
        });
        return;
      }
      
      setForm(prev => ({
        ...prev,
        fotoPerfil: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous errors
      if (errores.fotoPerfil) {
        setErrores(prev => {
          const newErrors = { ...prev };
          delete newErrors.fotoPerfil;
          return newErrors;
        });
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Foto de perfil (opcional)</label>
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Vista previa"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>
        <div>
          <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            {previewUrl ? 'Cambiar foto' : 'Subir foto'}
            <input
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500">
            {previewUrl ? 'Haz clic para cambiar la foto' : 'PNG, JPG, GIF (máx. 5MB)'}
          </p>
        </div>
      </div>
      {errores.fotoPerfil && (
        <p className="text-red-600 text-sm">{errores.fotoPerfil}</p>
      )}
    </div>
  );
}
