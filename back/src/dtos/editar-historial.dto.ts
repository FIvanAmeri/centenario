import { IsString } from 'class-validator';

export class EditarHistorialDto {
  @IsString()
  motivoConsulta: string;

  @IsString()
  diagnostico: string;

  @IsString()
  tratamiento: string;
}