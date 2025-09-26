import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from '../entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private logRepo: Repository<Log>) {}

  async registrar(tipo: 'error' | 'info' | 'warning', mensaje: string, modulo?: string) {
    const log = this.logRepo.create({ tipo, mensaje, modulo });
    return this.logRepo.save(log);
  }

  async listar(tipo?: 'error' | 'info' | 'warning') {
    const where = tipo ? { tipo } : {};
    return this.logRepo.find({ where, order: { fecha: 'DESC' }, take: 50 });
  }
}