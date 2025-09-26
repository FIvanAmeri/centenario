import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { PanelMedicoController } from '../controllers/panel-medico.controller';
import { PanelMedicoService } from '../services/panel-medico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, HistorialMedico])],
  controllers: [PanelMedicoController],
  providers: [PanelMedicoService],
})
export class PanelMedicoModule {}