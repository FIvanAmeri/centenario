import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsIn,
  IsBoolean,
  IsInt,
  Min,
  ValidateIf,
  Validate,
} from 'class-validator';
import { IsValidBirthDate } from 'src/common/validators/is-valid-birthdate.validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsIn(['masculino', 'femenino', 'otro'])
  sexo: string;

  @IsDateString()
  @Validate(IsValidBirthDate, { message: 'La fecha de nacimiento debe ser anterior a hoy y mayor de 18 años' })
  fechaNacimiento: string;

  @IsString()
  @IsOptional()
  domicilio?: string;

  @IsString()
  @IsOptional()
  localidad?: string;

  @ValidateIf((o) => o.pais?.toLowerCase() === 'argentina')
  @IsString()
  @IsOptional()
  provincia?: string;

  @ValidateIf((o) => o.localidad?.toLowerCase() === 'rosario')
  @IsString()
  @IsOptional()
  barrio?: string;

  @IsPhoneNumber('AR')
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  grupoSanguineo?: string;

  @IsString()
  @IsOptional()
  alergias?: string;

  @IsString()
  @IsOptional()
  antecedentes?: string;

  @IsBoolean()
  @IsOptional()
  discapacidad?: boolean;

  @ValidateIf((o) => o.discapacidad === true)
  @IsString()
  @IsOptional()
  tipoDiscapacidad?: string;

  @IsString()
  @IsOptional()
  nacionalidad?: string;

  @IsIn(['soltera', 'casada', 'en pareja'])
  @IsOptional()
  estadoCivil?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  cantidadHijos?: number;

  @IsString()
  @IsNotEmpty()
  pais: string;
}