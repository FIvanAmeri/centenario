import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TurnoService } from '../services/turno.service';
import { MailService } from '../mail/mail.service'; 

@Injectable()
export class RecordatorioService {
    constructor(
        private readonly turnoService: TurnoService,
        private readonly mailerService: MailService,
    ) {}

    @Cron('0 8 * * *')
    async enviarRecordatorios() {
        const turnos = await this.turnoService.obtenerTurnosEn48Horas(); 

        for (const turno of turnos) {
            await this.mailerService.enviarRecordatorioTurno(
                turno.paciente.email,
                turno.paciente.nombre,
                turno.fecha, 
                turno.hora,
                turno.medico.nombre,
                turno.medico.especialidad || 'No especificada', 
            );
        }
    }
}