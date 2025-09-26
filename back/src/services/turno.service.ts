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

    // dto.fecha ya es un objeto Date (gracias a @Type y ValidationPipe)
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

    const turno = this.turnoRepo.create({
      fecha: dto.fecha, // Asignación directa de Date
      hora: dto.hora,
      paciente,
      medico,
      estado: EstadoTurno.CONFIRMADO,
    });

    // Usamos toISOString para enviar la fecha como string al servicio de correo
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

    // SOLUCIÓN: Convertir el objeto Date (turno.fecha) a string
    const fechaParaCorreo = turno.fecha.toLocaleDateString('es-AR'); 

    await this.mailService.notificarCancelacionTurno(
      turno.paciente.email,
      fechaParaCorreo, // <-- ¡CORREGIDO! Se pasa la fecha como string
      motivo,
    );

    await this.turnoRepo.remove(turno);
    return { mensaje: 'Turno cancelado y liberado' };
  }

  async listarPorMedico(id: number): Promise<Turno[]> {
    return this.turnoRepo.find({ where: { medico: { id } } });
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