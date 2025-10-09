import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { Repository } from 'typeorm';
import { Horario } from '../entities/horario.entity';
import { MailService } from '../mail/mail.service';
import { AuditoriaService } from './auditoria.service';

@Injectable()
export class ReprogramacionService {
  constructor(
    @InjectRepository(Turno) private turnoRepo: Repository<Turno>,
    @InjectRepository(Horario) private horarioRepo: Repository<Horario>,
    private readonly mailService: MailService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async reprogramarTurno(
    turnoId: number,
    nuevaFecha: string,
    nuevaHora: string,
    motivo: string,
  ): Promise<Turno> {
    const turno = await this.turnoRepo.findOne({
      where: { id: turnoId },
      relations: ['paciente', 'medico'],
    });
    if (!turno) throw new NotFoundException('Turno no encontrado');


    const nuevaFechaDate = new Date(nuevaFecha); 
    
    const dia = nuevaFechaDate.toLocaleDateString('es-AR', {
      weekday: 'long',
    }).toLowerCase();

    const horarios = await this.horarioRepo.find({
      where: { usuario: { id: turno.medico.id }, dia },
    });

    const dentroDelHorario = horarios.some(
      (h) => nuevaHora >= h.desde && nuevaHora <= h.hasta,
    );

    if (!dentroDelHorario) {
      throw new BadRequestException('La nueva hora está fuera del horario permitido');
    }

  
    turno.fecha = nuevaFechaDate;
    turno.hora = nuevaHora;

    
    await this.mailService.notificarNuevoTurno( 
      turno.paciente.email, 
      nuevaFecha,  
      nuevaHora, 
      turno.medico.nombre,
    );

    await this.auditoriaService.registrar(
      `Turno reprogramado: ${motivo}`,
      turno.medico,
    );

    return this.turnoRepo.save(turno);
  }
}