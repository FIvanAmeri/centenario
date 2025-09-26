import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicamento } from '../entities/medicamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicamentoService {
  constructor(@InjectRepository(Medicamento) private repo: Repository<Medicamento>) {}

  async crear(nombre: string, dosis: string, via: string) {
    return this.repo.save(this.repo.create({ nombre, dosis, via }));
  }

  async listar() {
    return this.repo.find({ order: { nombre: 'ASC' } });
  }
}