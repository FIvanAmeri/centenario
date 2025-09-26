import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno, EstadoTurno } from '../entities/turno.entity';
import { Repository, FindOptionsWhere } from 'typeorm';

interface FiltrosTurno {
  fecha?: string;
  medicoId?: number;
  estado?: EstadoTurno;
}

@Injectable()
export class PanelAdministrativoService {
  constructor(
    @InjectRepository(Turno) private turnoRepo: Repository<Turno>,
  ) {}

  async listarTurnos(filtros: FiltrosTurno): Promise<Turno[]> {
    const where: FindOptionsWhere<Turno> = {};


    if (filtros.fecha) {
      where.fecha = new Date(filtros.fecha); 
    }

    if (filtros.medicoId) where.medico = { id: filtros.medicoId };
    
    if (
      filtros.estado &&
      Object.values(EstadoTurno).includes(filtros.estado)
    ) {
      where.estado = filtros.estado;
    }

    return this.turnoRepo.find({
      where,
      relations: ['paciente', 'medico'],
      order: { fecha: 'ASC', hora: 'ASC' },
    });
  }
}