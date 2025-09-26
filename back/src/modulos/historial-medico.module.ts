import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { HistoriaClinica } from '../entities/historia-clinica.entity';
import { User } from '../entities/user.entity';
import { HistoriaClinicaService } from '../services/historia-clinica.service';
import { HistorialMedicoController } from '../controllers/historial-medico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialMedico, HistoriaClinica, User])],
  controllers: [HistorialMedicoController],
  providers: [HistoriaClinicaService],
})
export class HistorialMedicoModule {}