import { IsString, IsInt } from 'class-validator';

export class CrearHorarioDto {
  @IsString()
  dia: string;

  @IsString()
  desde: string;

  @IsString()
  hasta: string;

  @IsInt()
  usuarioId: number;
}