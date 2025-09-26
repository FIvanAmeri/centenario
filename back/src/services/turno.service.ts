import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno, EstadoTurno } from '../entities/turno.entity';
import { Repository, Between } from 'typeorm';
import { CrearTurnoDto } from '../dtos/crear-turno.dto';
import { User } from '../entities/user.entity';
import { MailService } from '../mail/mail.service';
import { Horario } from '../entities/horario.entity';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno) private turnoRepo: Repository<Turno>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Horario) private horarioRepo: Repository<Horario>,
    private readonly mailService: MailService,
  ) {}

  async crearTurno(dto: CrearTurnoDto): Promise<Turno> {
    const paciente = await this.userRepo.findOne({ where: { id: dto.pacienteId } });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');

    const medico = await this.userRepo.findOne({ where: { id: dto.medicoId } });
    if (!medico) throw new NotFoundException('Médico no encontrado');

    const dia = dto.fecha.toLocaleDateString('es-AR', {
      weekday: 'long',
    }).toLowerCase();

    const horarios = await this.horarioRepo.find({
      where: { usuario: { id: dto.medicoId }, dia },
    });

    const dentroDelHorario = horarios.some(
      (h) => dto.hora >= h.desde && dto.hora <= h.hasta,
    );

    if (!dentroDelHorario) {
      throw new BadRequestException('El turno está fuera del horario permitido');
    }

    const existeTurno = await this.turnoRepo.findOne({
      where: {
        paciente: { id: dto.pacienteId },
        fecha: dto.fecha,
        hora: dto.hora,
      },
    });

    if (existeTurno) {
      throw new BadRequestException('Ya existe un turno para ese paciente en esa fecha y hora');
    }

    const turno = this.turnoRepo.create({
      fecha: dto.fecha,
      hora: dto.hora,
      paciente,
      medico,
      estado: EstadoTurno.AGENDADO,
    });

    await this.mailService.enviarConfirmacionTurno(
      paciente.email,
      dto.fecha.toISOString().split('T')[0],
      dto.hora,
      medico.nombre,
      medico.rol,
      'Hospital Centenario',
    );

    return this.turnoRepo.save(turno);
  }

  async cambiarEstado(id: number, estado: string): Promise<Turno> {
    const turno = await this.turnoRepo.findOne({ where: { id } });
    if (!turno) throw new NotFoundException('Turno no encontrado');

    turno.estado = estado as EstadoTurno;
    return this.turnoRepo.save(turno);
  }

  async cancelarTurno(id: number, motivo: string): Promise<{ mensaje: string }> {
    const turno = await this.turnoRepo.findOne({
      where: { id },
      relations: ['paciente'],
    });
    if (!turno) throw new NotFoundException('Turno no encontrado');

    const fechaParaCorreo = turno.fecha.toLocaleDateString('es-AR');

    await this.mailService.notificarCancelacionTurno(
      turno.paciente.email,
      fechaParaCorreo,
      motivo,
    );

    await this.turnoRepo.remove(turno);
    return { mensaje: 'Turno cancelado y liberado' };
  }

  async confirmarTurno(id: number): Promise<Turno> {
    const turno = await this.turnoRepo.findOne({ where: { id } });
    if (!turno) throw new NotFoundException('Turno no encontrado');

    if (turno.estado !== EstadoTurno.AGENDADO) {
      throw new BadRequestException('Solo se pueden confirmar turnos que estén agendados');
    }

    turno.estado = EstadoTurno.CONFIRMADO;
    return this.turnoRepo.save(turno);
  }

  async listarPorMedico(id: number): Promise<Turno[]> {
    return this.turnoRepo.find({
      where: { medico: { id } },
      relations: ['paciente'],
      order: { fecha: 'ASC', hora: 'ASC' },
    });
  }

  async listarTodosPorFecha(fecha: Date): Promise<Turno[]> {
    const inicio = new Date(fecha);
    inicio.setHours(0, 0, 0, 0);

    const fin = new Date(fecha);
    fin.setHours(23, 59, 59, 999);

    return this.turnoRepo.find({
      where: { fecha: Between(inicio, fin) },
      relations: ['paciente', 'medico'],
      order: { hora: 'ASC' },
    });
  }

  async listarTodosPorRango(desde: Date, hasta: Date): Promise<Turno[]> {
    const inicio = new Date(desde);
    inicio.setHours(0, 0, 0, 0);

    const fin = new Date(hasta);
    fin.setHours(23, 59, 59, 999);

    return this.turnoRepo.find({
      where: { fecha: Between(inicio, fin) },
      relations: ['paciente', 'medico'],
      order: { fecha: 'ASC', hora: 'ASC' },
    });
  }

  async obtenerTurnosEn48Horas(): Promise<Turno[]> {
    const ahora = new Date();
    const limite = new Date();
    limite.setHours(limite.getHours() + 48);

    return this.turnoRepo.find({
      where: {
        fecha: Between(ahora, limite),
        estado: EstadoTurno.CONFIRMADO,
      },
      relations: ['paciente', 'medico'],
    });
  }
}