import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuracion } from '../entities/configuracion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfiguracionService {
  constructor(@InjectRepository(Configuracion) private repo: Repository<Configuracion>) {}

  async obtener(clave: string): Promise<string> {
    const config = await this.repo.findOne({ where: { clave } });
    if (!config) throw new Error(`Configuración "${clave}" no encontrada`);
    return config.valor;
  }

  async actualizar(clave: string, valor: string) {
    const existente = await this.repo.findOne({ where: { clave } });
    if (existente) {
      existente.valor = valor;
      return this.repo.save(existente);
    }
    return this.repo.save(this.repo.create({ clave, valor }));
  }

  async listar() {
    return this.repo.find({ order: { clave: 'ASC' } });
  }
}