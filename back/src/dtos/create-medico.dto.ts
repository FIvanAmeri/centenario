export interface CrearHorarioDto {
  dia: string;
  desde: string;
  hasta: string;
}

export class CreateMedicoDto {
  nombre!: string;
  email!: string;
  dni!: string;
  fechaNacimiento!: string;
  especialidad!: string;
  telefono!: string;
  direccion!: string;
  matricula!: string;
  password!: string;
  horarios!: CrearHorarioDto[];
}
