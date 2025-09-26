import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from '../entities/notificacion.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion) private notiRepo: Repository<Notificacion>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async enviar(mensaje: string, usuarioId: number): Promise<Notificacion> {
    const usuario = await this.userRepo.findOne({ where: { id: usuarioId } });
    if (!usuario) throw new Error('Usuario no encontrado');

    const noti = this.notiRepo.create({ mensaje, destinatario: usuario });
    return this.notiRepo.save(noti);
  }

  async listar(usuarioId: number): Promise<Notificacion[]> {
    return this.notiRepo.find({
      where: { destinatario: { id: usuarioId } },
      order: { fecha: 'DESC' },
    });
  }

  async marcarComoLeida(id: number): Promise<void> {
    await this.notiRepo.update(id, { leida: true });
  }
}