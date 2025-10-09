export class EstadisticasPacienteDto {
  totalConsultas: number;

  diagnosticosFrecuentes: {
    diagnostico: string;
    cantidad: number;
  }[];

  consultasPorMes: {
    mes: string;
    cantidad: number;
  }[];
}