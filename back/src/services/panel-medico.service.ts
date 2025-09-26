import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PanelMedicoService {
  constructor(
    @InjectRepository(Turno) private turnoRepo: Repository<Turno>,
    @InjectRepository(HistorialMedico) private historialRepo: Repository<HistorialMedico>,
  ) {}

  async obtenerResumen(medicoId: number) {
    const turnos = await this.turnoRepo.find({
      where: { medico: { id: medicoId } },
      order: { fecha: 'ASC' },
    });

    const registros = await this.historialRepo.find({
      where: { medico: { id: medicoId } },
      order: { fecha: 'DESC' },
    });

    const pendientes = registros.filter(r => !r.firmado);

    return {
      turnos,
      registros,
      firmasPendientes: pendientes.length,
    };
  }
}