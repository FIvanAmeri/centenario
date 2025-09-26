import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { Repository } from 'typeorm';
import { EstadisticasPacienteDto } from '../dtos/estadistica-paciente.dto';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(HistorialMedico)
    private readonly historialRepo: Repository<HistorialMedico>,
  ) {}

  async estadisticasPorPaciente(pacienteId: number): Promise<EstadisticasPacienteDto> {
    const totalConsultas = await this.historialRepo.count({
      where: { historia: { paciente: { id: pacienteId } } },
    });

    const diagnosticosFrecuentes = await this.historialRepo
      .createQueryBuilder('h')
      .select('h.diagnostico', 'diagnostico')
      .addSelect('COUNT(*)', 'cantidad')
      .where('h.historiaId = :pacienteId', { pacienteId })
      .groupBy('h.diagnostico')
      .orderBy('cantidad', 'DESC')
      .limit(5)
      .getRawMany();

    const consultasPorMes = await this.historialRepo
      .createQueryBuilder('h')
      .select("TO_CHAR(h.fechaCreacion, 'Month YYYY')", 'mes')
      .addSelect('COUNT(*)', 'cantidad')
      .where('h.historiaId = :pacienteId', { pacienteId })
      .groupBy("TO_CHAR(h.fechaCreacion, 'Month YYYY')")
      .orderBy('mes', 'DESC')
      .getRawMany();

    return {
      totalConsultas,
      diagnosticosFrecuentes,
      consultasPorMes,
    };
  }

  async estadisticasPorMedico(medicoId: number): Promise<EstadisticasPacienteDto> {
    const totalConsultas = await this.historialRepo.count({
      where: { medico: { id: medicoId } },
    });

    const diagnosticosFrecuentes = await this.historialRepo
      .createQueryBuilder('h')
      .select('h.diagnostico', 'diagnostico')
      .addSelect('COUNT(*)', 'cantidad')
      .where('h.medicoId = :medicoId', { medicoId })
      .groupBy('h.diagnostico')
      .orderBy('cantidad', 'DESC')
      .limit(5)
      .getRawMany();

    const consultasPorMes = await this.historialRepo
      .createQueryBuilder('h')
      .select("TO_CHAR(h.fechaCreacion, 'Month YYYY')", 'mes')
      .addSelect('COUNT(*)', 'cantidad')
      .where('h.medicoId = :medicoId', { medicoId })
      .groupBy("TO_CHAR(h.fechaCreacion, 'Month YYYY')")
      .orderBy('mes', 'DESC')
      .getRawMany();

    return {
      totalConsultas,
      diagnosticosFrecuentes,
      consultasPorMes,
    };
  }
}