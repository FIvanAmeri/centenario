import RegisterForm from "@/components/registro/RegisterForm";

export default function RegistroPage() {
  return (
    // Agregamos min-h-screen para que el contenedor use el 100% del alto de la ventana
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-2xl z-10 border border-neutral-200 text-neutral-900">
        <RegisterForm />
      </div>
    </div>
  );
}