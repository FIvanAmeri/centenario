import { FormularioAdministrativo } from "@/hooks/registerAdministrativo/useFormularioAdministrativo";

export interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  className?: string;
}

export interface FormularioCamposProps {
  form: FormularioAdministrativo;
  errores: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface CampoFotoProps {
  setForm: React.Dispatch<React.SetStateAction<FormularioAdministrativo>>;
  setPreviewUrl: (url: string | null) => void;
  setErrores: (errors: Record<string, string>) => void;
  errores: Record<string, string>;
  previewUrl: string | null;
}

export interface BotonSubmitProps {
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}
