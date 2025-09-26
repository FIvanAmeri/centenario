import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { User } from '../entities/user.entity';
import { Horario } from '../entities/horario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetricasSuperadminService {
  constructor(
    @InjectRepository(Turno) private turnoRepo: Repository<Turno>,
    @InjectRepository(HistorialMedico) private historialRepo: Repository<HistorialMedico>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Horario) private horarioRepo: Repository<Horario>,
  ) {}

  async obtener() {
    const turnos = await this.turnoRepo.count();
    const registros = await this.historialRepo.count();
    const usuarios = await this.userRepo.count();
    const horarios = await this.horarioRepo.count();

    return {
      totalTurnos: turnos,
      totalRegistrosMedicos: registros,
      totalUsuarios: usuarios,
      totalHorarios: horarios,
    };
  }
}