import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auditoria } from '../entities/auditoria.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(Auditoria) private auditoriaRepo: Repository<Auditoria>,
  ) {}

  async registrar(accion: string, usuario: User) {
    const registro = this.auditoriaRepo.create({ accion, usuario });
    return this.auditoriaRepo.save(registro);
  }

  async listarUltimas(cantidad = 20) {
    return this.auditoriaRepo.find({
      order: { fecha: 'DESC' },
      take: cantidad,
      relations: ['usuario'],
    });
  }
}