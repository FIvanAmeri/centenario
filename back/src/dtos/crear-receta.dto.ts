import { IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MedicamentoDto {
  @IsString()
  nombre: string;

  @IsString()
  dosis: string;

  @IsString()
  frecuencia: string;

  @IsString()
  via: string;
}

export class CrearRecetaDto {
  @IsString()
  fecha: string;

  @IsInt()
  medicoId: number;

  @IsInt()
  pacienteId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicamentoDto)
  medicamentos: MedicamentoDto[];
}