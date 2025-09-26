import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { User } from '../entities/user.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { Auditoria } from '../entities/auditoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardSuperadminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Turno) private turnoRepo: Repository<Turno>,
    @InjectRepository(HistorialMedico) private historialRepo: Repository<HistorialMedico>,
    @InjectRepository(Auditoria) private auditoriaRepo: Repository<Auditoria>,
  ) {}

  async obtenerResumen() {
    const usuarios = await this.userRepo.count();
    const turnos = await this.turnoRepo.count();
    const registros = await this.historialRepo.count();
    const auditoria = await this.auditoriaRepo.find({
      order: { fecha: 'DESC' },
      take: 10,
      relations: ['usuario'],
    });

    return {
      totalUsuarios: usuarios,
      totalTurnos: turnos,
      totalRegistros: registros,
      auditoriaReciente: auditoria,
    };
  }
}