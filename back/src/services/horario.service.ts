import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from '../entities/horario.entity';
import { Repository } from 'typeorm';
import { CrearHorarioDto } from '../dtos/crear-horario.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario) private horarioRepo: Repository<Horario>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async crear(dto: CrearHorarioDto) {
    const usuario = await this.userRepo.findOne({ where: { id: dto.usuarioId } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const horario = this.horarioRepo.create({ ...dto, usuario });
    return this.horarioRepo.save(horario);
  }

  async ver(usuarioId: number) {
    return this.horarioRepo.find({ where: { usuario: { id: usuarioId } } });
  }
}