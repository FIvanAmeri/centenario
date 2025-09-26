import TablaPacientes from "@/components/pacientes/TablaPacientes";
import FormularioPaciente from "@/components/pacientes/FormularioPaciente";

export default function PacientesAdministrativoPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--primary)]">
        Gestión de Pacientes
      </h1>
      <FormularioPaciente />
      <TablaPacientes />
    </div>
  );
}