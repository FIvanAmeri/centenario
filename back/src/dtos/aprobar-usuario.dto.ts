import { IsBoolean } from 'class-validator';

export class AprobarUsuarioDto {
  @IsBoolean()
  aprobado: boolean;
}