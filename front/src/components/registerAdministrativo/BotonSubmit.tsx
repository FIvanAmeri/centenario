import { Loader2 } from "lucide-react";

interface BotonSubmitProps {
  loading?: boolean;
  disabled?: boolean;
}

export default function BotonSubmit({ loading = false, disabled = false }: BotonSubmitProps) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={`w-full bg-green-600 text-white font-bold py-2.5 rounded-lg transition-all shadow hover:shadow-md ${
        loading || disabled
          ? 'bg-green-400 cursor-not-allowed'
          : 'hover:bg-green-700'
      } flex items-center justify-center gap-2`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5" />
          Procesando...
        </>
      ) : (
        'Registrarse'
      )}
    </button>
  );
}
