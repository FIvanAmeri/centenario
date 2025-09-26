import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { Repository } from 'typeorm';
import { Parser } from 'json2csv';
import { Between } from 'typeorm';

@Injectable()
export class ExportacionService {
  constructor(@InjectRepository(Turno) private turnoRepo: Repository<Turno>) {}

  async exportarTurnosCSV(fechaInicio: string, fechaFin: string): Promise<string> {
    

    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);

    const turnos = await this.turnoRepo.find({
      where: {
        fecha: Between(fechaInicioDate, fechaFinDate), 
      },
      relations: ['paciente', 'medico'],
    });

    const datos = turnos.map((t) => ({
      Fecha: t.fecha.toLocaleDateString('es-AR'), 
      Hora: t.hora,
      Paciente: t.paciente.nombre, 
      Médico: t.medico.nombre,
      Estado: t.estado,
    }));

    const parser = new Parser();
    return parser.parse(datos);
  }
}