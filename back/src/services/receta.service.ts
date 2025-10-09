import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receta } from '../entities/receta.entity';
import { Repository } from 'typeorm';
import { CrearRecetaDto } from '../dtos/crear-receta.dto';
import { User } from '../entities/user.entity';
import { Medicamento } from '../entities/medicamento.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(Receta) private recetaRepo: Repository<Receta>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Medicamento) private medRepo: Repository<Medicamento>,
    private readonly mailService: MailService,
  ) {}

  async crearReceta(dto: CrearRecetaDto) {
    const medico = await this.userRepo.findOne({ where: { id: dto.medicoId } });
    const paciente = await this.userRepo.findOne({ where: { id: dto.pacienteId } });

    if (!medico || !paciente) throw new NotFoundException('Usuario no encontrado');

    const medicamentos = dto.medicamentos.map((m) => this.medRepo.create(m));

    const receta = this.recetaRepo.create({
      fecha: new Date(dto.fecha),
      medico,
      paciente,
      medicamentos,
      descripcion: 'Receta médica generada por el sistema',
    });

    const recetaGuardada = await this.recetaRepo.save(receta);

    await this.mailService.notificarNuevoTurno(
      paciente.email,                    
      paciente.nombre,                    
      medico.nombre,   
      recetaGuardada.fecha.toLocaleDateString('es-AR'),
    );

    return recetaGuardada;
  }

  async firmarReceta(id: number) {
    const receta = await this.recetaRepo.findOne({
      where: { id },
      relations: ['paciente', 'medico', 'medicamentos'],
    });

    if (!receta) throw new NotFoundException('Receta no encontrada');

    receta.firmada = true;
    const recetaFirmada = await this.recetaRepo.save(receta);

    await this.mailService.notificarNuevoTurno(
      receta.paciente.email,
      receta.paciente.nombre,
      receta.medico.nombre,
      receta.fecha.toLocaleDateString('es-AR'),
     );

    return recetaFirmada;
  }

  async obtenerPorPaciente(pacienteId: number): Promise<Receta[]> {
    const paciente = await this.userRepo.findOne({ where: { id: pacienteId } });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');

    return this.recetaRepo.find({
      where: { paciente: { id: pacienteId } },
      relations: ['medico', 'medicamentos'],
      order: { fecha: 'DESC' },
    });
  }
}