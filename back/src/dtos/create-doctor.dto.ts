import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsUrl,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';
import { Match } from '../common/decorators/match.decorator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  especialidad: string;

  @IsString()
  @IsNotEmpty()
  matricula: string;

  @IsPhoneNumber('AR')
  telefono: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  diasTrabajo: string[];

  @IsOptional()
  @IsString()
  @IsUrl()
  fotoPerfil?: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  @Match('password', { message: 'Las contraseñas no coinciden' })
  repetirPassword: string;
}