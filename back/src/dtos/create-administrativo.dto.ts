import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsUrl,
  IsPhoneNumber,
  MinLength,
  Matches,
  IsDateString,
  Validate,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
import { Type } from 'class-transformer';
import { IsValidBirthDate } from 'src/common/validators/is-valid-birthdate.validator';

export class CreateAdministrativoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsArray()
  @ArrayNotEmpty()
  diasTrabajo: { dia: string; horaInicio: string; horaFin: string }[];

  @IsPhoneNumber('AR')
  telefono: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  fotoPerfil?: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsDateString()
  @Validate(IsValidBirthDate, { message: 'La fecha de nacimiento no puede ser futura ni menor de edad' })
  fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  @Match('password', { message: 'Las contraseñas no coinciden' })
  repetirPassword: string;
}