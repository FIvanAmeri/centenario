export class EstadisticasPacienteDto {
  totalConsultas: number;

  diagnosticosFrecuentes: {
    diagnostico: string;
    cantidad: number;
  }[];

  consultasPorMes: {
    mes: string; // Ej: "Septiembre 2025"
    cantidad: number;
  }[];
}