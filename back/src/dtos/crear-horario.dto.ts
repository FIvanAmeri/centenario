import { IsString, IsInt, IsOptional } from 'class-validator';

export class CrearHorarioDto {
  @IsString()
  dia: string;

  @IsString()
  desde: string;

  @IsString()
  hasta: string;

  @IsOptional()
  @IsInt()
  usuarioId?: number;
}