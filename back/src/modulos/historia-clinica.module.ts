import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from '../entities/historia-clinica.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { User } from '../entities/user.entity';
import { HistoriaClinicaService } from '../services/historia-clinica.service';
import { HistoriaClinicaController } from '../controllers/historia-clinica.controller';
import { HistorialMedicoController } from '../controllers/historial-medico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica, HistorialMedico, User])],
  controllers: [HistoriaClinicaController, HistorialMedicoController],
  providers: [HistoriaClinicaService],
})
export class HistoriaClinicaModule {}