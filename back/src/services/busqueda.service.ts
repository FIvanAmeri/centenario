import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusquedaService {
  constructor(@InjectRepository(Turno) private turnoRepo: Repository<Turno>) {}

  async buscarTurnos(query: string) {
    return this.turnoRepo
      .createQueryBuilder('turno')
      .leftJoinAndSelect('turno.paciente', 'paciente')
      .leftJoinAndSelect('turno.medico', 'medico')
      .where('paciente.nombre ILIKE :q OR medico.nombre ILIKE :q', { q: `%${query}%` })
      .orderBy('turno.fecha', 'DESC')
      .limit(50)
      .getMany();
  }
}