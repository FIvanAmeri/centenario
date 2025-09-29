import { IsIn, IsString, IsBoolean } from 'class-validator';

export class ActualizarPermisoDto {
  @IsIn(['medico', 'administrativo', 'superadmin'])
  rol: 'medico' | 'administrativo' | 'superadmin';

  @IsString()
  accion: string;

  @IsBoolean()
  permitido: boolean;
}