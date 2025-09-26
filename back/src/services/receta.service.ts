import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receta } from '../entities/receta.entity';
import { Repository } from 'typeorm';
import { CrearRecetaDto } from '../dtos/crear-receta.dto';
import { User } from '../entities/user.entity';
import { Medicamento } from '../entities/medicamento.entity';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(Receta) private recetaRepo: Repository<Receta>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Medicamento) private medRepo: Repository<Medicamento>,
  ) {}

  async crearReceta(dto: CrearRecetaDto) {
    const medico = await this.userRepo.findOne({ where: { id: dto.medicoId } });
    const paciente = await this.userRepo.findOne({ where: { id: dto.pacienteId } });

    if (!medico || !paciente) throw new NotFoundException('Usuario no encontrado');

    const receta = this.recetaRepo.create({
      fecha: dto.fecha,
      medico,
      paciente,
      medicamentos: dto.medicamentos.map((m) => this.medRepo.create(m)),
    });

    return this.recetaRepo.save(receta);
  }

  async firmarReceta(id: number) {
    const receta = await this.recetaRepo.findOne({ where: { id } });
    if (!receta) throw new NotFoundException('Receta no encontrada');

    receta.firmada = true;
    return this.recetaRepo.save(receta);
  }
}