import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { Repository } from 'typeorm';
import { AuditoriaService } from './auditoria.service';
import { User } from '../entities/user.entity';

@Injectable()
export class FirmaService {
  constructor(
    @InjectRepository(HistorialMedico)
    private historialRepo: Repository<HistorialMedico>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async firmarRegistro(
    id: number,
    medicoId: number,
  ): Promise<HistorialMedico> {
    const registro = await this.historialRepo.findOne({
      where: { id },
      relations: ['medico'],
    });

    if (!registro) throw new NotFoundException('Registro no encontrado');
    if (registro.firmado)
      throw new BadRequestException('El registro ya está firmado');
    if (registro.medico.id !== medicoId)
      throw new BadRequestException(
        'No autorizado para firmar este registro',
      );

    registro.firmado = true;
    registro.fechaFirma = new Date();

    const usuario = await this.userRepo.findOne({ where: { id: medicoId } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    await this.auditoriaService.registrar('Registro médico firmado', usuario);
    return this.historialRepo.save(registro);
  }
}