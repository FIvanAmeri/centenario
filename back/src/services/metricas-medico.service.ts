import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetricasMedicoService {
  constructor(
    @InjectRepository(HistorialMedico) private historialRepo: Repository<HistorialMedico>,
  ) {}

  async obtenerPorMedico(medicoId: number) {
    const registros = await this.historialRepo.count({ where: { medico: { id: medicoId } } });
    return { registrosCreados: registros };
  }
}