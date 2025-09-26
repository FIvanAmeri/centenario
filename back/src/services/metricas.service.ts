import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Turno } from '../entities/turno.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetricasService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Turno) private turnoRepo: Repository<Turno>,
    @InjectRepository(HistorialMedico) private historialRepo: Repository<HistorialMedico>,
  ) {}

  async obtenerPorMedico(medicoId: number) {
    const medico = await this.userRepo.findOne({ where: { id: medicoId } });
    if (!medico) throw new Error('Médico no encontrado');

    const turnos = await this.turnoRepo.count({ where: { medico: { id: medicoId } } });
    const registros = await this.historialRepo.find({ where: { medico: { id: medicoId } } });

    const firmados = registros.filter(r => r.firmado).length;

    const promedioFirma = this.calcularPromedioFirma(registros);

    return {
      medico: medico.nombre,
      totalTurnos: turnos,
      totalRegistros: registros.length,
      registrosFirmados: firmados,
      promedioTiempoFirma: promedioFirma,
    };
  }

  private calcularPromedioFirma(registros: HistorialMedico[]): string {
    const diferencias = registros
      .filter(r => r.firmado && r.fechaFirma)
      .map(r => {
        const inicio = new Date(r.fecha);
        const fin = new Date(r.fechaFirma);
        return fin.getTime() - inicio.getTime();
      });

    if (diferencias.length === 0) return 'Sin datos';

    const promedioMs = diferencias.reduce((a, b) => a + b, 0) / diferencias.length;
    const horas = Math.floor(promedioMs / (1000 * 60 * 60));
    const minutos = Math.floor((promedioMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${horas}h ${minutos}m`;
  }
}