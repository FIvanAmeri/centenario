import { IsIn, IsString, IsBoolean } from 'class-validator';

export class ActualizarPermisoDto {
  @IsIn(['medico', 'admin', 'superadmin'])
  rol: 'medico' | 'admin' | 'superadmin';

  @IsString()
  accion: string;

  @IsBoolean()
  permitido: boolean;
}