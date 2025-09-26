import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancelacion } from '../entities/cancelacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CancelacionService {
  constructor(@InjectRepository(Cancelacion) private repo: Repository<Cancelacion>) {}

  async registrar(turnoId: number, motivo: string) {
    const cancelacion = this.repo.create({ turnoId, motivo });
    return this.repo.save(cancelacion);
  }

  async listar() {
    return this.repo.find({ order: { fecha: 'DESC' }, take: 50 });
  }
}