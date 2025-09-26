import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alerta } from '../entities/alerta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlertaService {
  constructor(@InjectRepository(Alerta) private repo: Repository<Alerta>) {}

  async crear(mensaje: string, tipo: Alerta['tipo']) {
    return this.repo.save(this.repo.create({ mensaje, tipo }));
  }

  async listarNoLeidas() {
    return this.repo.find({ where: { leida: false }, order: { fecha: 'DESC' } });
  }

  async marcarLeida(id: number) {
    await this.repo.update(id, { leida: true });
  }
}