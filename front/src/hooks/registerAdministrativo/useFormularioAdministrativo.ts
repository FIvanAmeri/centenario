import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export interface FormularioAdministrativo {
  nombre: string;
  email: string;
  password: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  direccion: string;
  rol: string;
  fotoPerfil: File | null;
}

export const useFormularioAdministrativo = () => {
  const router = useRouter();
  
  const [form, setForm] = useState<FormularioAdministrativo>({
    nombre: "",
    email: "",
    password: "",
    dni: "",
    fechaNacimiento: "",
    telefono: "",
    direccion: "",
    rol: "administrativo",
    fotoPerfil: null,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorGlobal, setErrorGlobal] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errores[name]) {
      setErrores((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrores(prev => ({
          ...prev,
          fotoPerfil: 'Por favor sube un archivo de imagen válido'
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrores(prev => ({
          ...prev,
          fotoPerfil: 'La imagen no puede pesar más de 5MB'
        }));
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

  return {
    form,
    setForm,
    errores,
    setErrores,
    errorGlobal,
    setErrorGlobal,
    previewUrl,
    setPreviewUrl,
    loading,
    setLoading,
    handleChange,
    handleFileChange,
    router,
  };
};
