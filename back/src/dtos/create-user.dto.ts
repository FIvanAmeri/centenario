import { IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';
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
  activo?: boolean;
}