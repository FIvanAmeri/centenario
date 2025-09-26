import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoriaClinica } from '../entities/historia-clinica.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { Repository } from 'typeorm';
import { CrearHistorialDto } from '../dtos/crear-historial.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class HistoriaClinicaService {
  constructor(
    @InjectRepository(HistoriaClinica) private historiaRepo: Repository<HistoriaClinica>,
    @InjectRepository(HistorialMedico) private registroRepo: Repository<HistorialMedico>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async verHistoria(pacienteId: number) {
    const historia = await this.historiaRepo.findOne({
      where: { paciente: { id: pacienteId } },
      relations: ['registros', 'registros.medico'],
    });

    if (!historia) throw new NotFoundException('Historia clínica no encontrada');
    return historia;
  }

  async agregarRegistro(pacienteId: number, dto: CrearHistorialDto) {
    let historia = await this.historiaRepo.findOne({
      where: { paciente: { id: pacienteId } },
      relations: ['registros'],
    });

    if (!historia) {
      const paciente = await this.userRepo.findOne({ where: { id: pacienteId } });
      if (!paciente) throw new NotFoundException('Paciente no encontrado');

      historia = this.historiaRepo.create({ paciente, registros: [] });
      await this.historiaRepo.save(historia);
    }

    const medico = await this.userRepo.findOne({ where: { id: dto.medicoId } });
    if (!medico) throw new NotFoundException('Médico no encontrado');

    const registro = this.registroRepo.create({ ...dto, medico, historia });
    await this.registroRepo.save(registro);
    return registro;
  }

  async firmarRegistro(registroId: number) {
    const registro = await this.registroRepo.findOne({ where: { id: registroId } });
    if (!registro) throw new NotFoundException('Registro no encontrado');

    registro.firmado = true;
    return this.registroRepo.save(registro);
  }
}