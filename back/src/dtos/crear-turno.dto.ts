import { IsInt, Matches, IsDateString } from 'class-validator';
import { Type } from 'class-transformer'; // <-- Importación necesaria

export class CrearTurnoDto {
  @IsDateString()
  @Type(() => Date) // <-- Convierte la cadena de fecha a un objeto Date
  fecha: Date;      // <-- El tipo ahora es Date

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora debe estar en formato HH:mm',
  })
  hora: string;

  @IsInt()
  pacienteId: number;

  @IsInt()
  medicoId: number;
}