import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadisticasService {
  constructor(@InjectRepository(Turno) private turnoRepo: Repository<Turno>) {}

  async turnosPorDia() {
    return this.turnoRepo
      .createQueryBuilder('turno')
      .select('DATE(turno.fecha)', 'dia')
      .addSelect('COUNT(*)', 'cantidad')
      .groupBy('dia')
      .orderBy('dia', 'DESC')
      .limit(30)
      .getRawMany();
  }

  async turnosPorEspecialidad() {
    return this.turnoRepo
      .createQueryBuilder('turno')
      .leftJoin('turno.medico', 'medico')
      .select('medico.especialidad', 'especialidad')
      .addSelect('COUNT(*)', 'cantidad')
      .groupBy('medico.especialidad')
      .orderBy('cantidad', 'DESC')
      .getRawMany();
  }
}