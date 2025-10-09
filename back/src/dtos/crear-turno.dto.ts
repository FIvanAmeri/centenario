import { IsInt, Matches, IsDateString } from 'class-validator';
import { Type } from 'class-transformer'; 

export class CrearTurnoDto {
  @IsDateString()
  @Type(() => Date) 
  fecha: Date;     

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora debe estar en formato HH:mm',
  })
  hora: string;

  @IsInt()
  pacienteId: number;

  @IsInt()
  medicoId: number;
}