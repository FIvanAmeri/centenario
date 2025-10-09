import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import type { SendMailOptions } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  private async safeSend(options: SendMailOptions & { template?: string; context?: Record<string, unknown> }): Promise<void> {
    try {
      await this.mailerService.sendMail(options as any);
      this.logger.log(`📨 Mail enviado a ${options.to} con asunto "${options.subject}"`);
    } catch (err) {
      this.logger.error(`💥 Error enviando mail a ${options.to}`, (err as Error).message);
      }
  }

  async sendMail(options: SendMailOptions & { template?: string; context?: Record<string, unknown> }): Promise<void> {
    return this.safeSend(options);
  }

  async enviarBienvenida(email: string, nombre: string): Promise<void> {
    await this.safeSend({
      to: email,
      subject: 'Bienvenido a Hospital Centenario',
      template: 'bienvenida',
      context: { nombre },
    });
  }

  async notificarRespuestaSuperadmin(email: string, aprobado: boolean): Promise<void> {
    await this.safeSend({
      to: email,
      subject: 'Estado de tu registro en Hospital Centenario',
      template: 'respuesta-superadmin',
      context: { aprobado },
    });
  }

  async notificarNuevoTurno(email: string, nombre: string, fecha: string, hora: string): Promise<void> {
    await this.safeSend({
      to: email,
      subject: 'Nuevo turno agendado',
      template: 'nuevo-turno',
      context: { nombre, fecha, hora },
    });
  }

  async notificarRecordatorioTurno(email: string, nombre: string, fecha: string, hora: string): Promise<void> {
    await this.safeSend({
      to: email,
      subject: 'Recordatorio de turno',
      template: 'recordatorio-turno',
      context: { nombre, fecha, hora },
    });
  }

  async notificarTurnoCancelado(email: string, nombre: string, fecha: string, hora: string): Promise<void> {
    await this.safeSend({
      to: email,
      subject: 'Cancelación de turno',
      template: 'cancelacion-turno',
      context: { nombre, fecha, hora },
    });
  }

  async notificarTurnoReprogramado(email: string, nombre: string, fecha: string, hora: string, nuevaFecha: string, nuevaHora: string): Promise<void> {
    await this.safeSend({
      to: email,
      subject: 'Reprogramación de turno',
      template: 'reprogramacion-turno',
      context: { nombre, fecha, hora, nuevaFecha, nuevaHora },
    });
  }

  async notificarSolicitudMedico(email: string, nombre: string): Promise<void> {
    await this.safeSend({
      to: email,
      subject: 'Registro recibido - Hospital Centenario',
      template: 'registro-medico-pendiente',
      context: { nombre },
    });
  }

  async notificarSuperadminsNuevoMedico(email: string, nombreMedico: string, emailMedico: string): Promise<void> {
    await this.safeSend({
      to: email,
      subject: 'Nueva solicitud de médico',
      template: 'notificacion-superadmin',
      context: { nombreMedico, emailMedico },
    });
  }
}
