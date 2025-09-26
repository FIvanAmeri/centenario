import { IsString, IsInt } from 'class-validator';

export class CrearHistorialDto {
  @IsString()
  fecha: string;

  @IsString()
  motivoConsulta: string;

  @IsString()
  diagnostico: string;

  @IsString()
  tratamiento: string;

  @IsInt()
  medicoId: number;
}