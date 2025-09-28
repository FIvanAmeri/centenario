import { IsEmail, IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { Rol } from '../entities/rol.enum';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Rol)
  rol: Rol;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsString()
  especialidad?: string; // 🚨 Para reflejar el nuevo campo
}