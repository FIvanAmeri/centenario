import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async enviarBienvenida(email: string, nombre: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Bienvenido a Hospital Centenario',
      template: 'bienvenida',
      context: { nombre },
    });
  }

  async notificarRespuestaSuperadmin(email: string, aprobado: boolean) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Estado de tu registro en Hospital Centenario',
      template: 'respuesta-superadmin',
      context: { aprobado },
    });
  }

  async enviarConfirmacionTurno(
    email: string,
    fecha: string,
    hora: string,
    medico: string,
    especialidad: string,
    ubicacion: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmación de turno',
      template: 'turno-confirmado',
      context: { fecha, hora, medico, especialidad, ubicacion },
    });
  }

  async notificarCancelacionTurno(email: string, fecha: string, motivo: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Cancelación de turno',
      template: 'turno-cancelado',
      context: { fecha, motivo },
    });
  }

  async notificarReprogramacionTurno(
    email: string,
    nuevaFecha: string,
    nuevaHora: string,
    medico: string,
    motivo: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reprogramación de turno',
      template: 'turno-reprogramado',
      context: { nuevaFecha, nuevaHora, medico, motivo },
    });
  }
  
  // NUEVO MÉTODO PARA RECORDATORIO
  async enviarRecordatorioTurno(
    email: string,
    nombrePaciente: string,
    fecha: Date, // Recibimos Date del servicio
    hora: string,
    medico: string,
    especialidad: string, 
  ) {
    // Convertimos Date a un string amigable para el correo
    const fechaString = fecha.toLocaleDateString('es-AR'); 

    await this.mailerService.sendMail({
      to: email,
      subject: 'Recordatorio de turno',
      template: 'emails/recordatorio-turno', 
      context: { 
          nombre: nombrePaciente, 
          fecha: fechaString, 
          hora, 
          medico, 
          especialidad 
      },
    });
  }
}