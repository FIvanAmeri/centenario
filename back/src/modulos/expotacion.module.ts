import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { HistoriaClinica } from '../entities/historia-clinica.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { Receta } from '../entities/receta.entity';
import { User } from '../entities/user.entity';
import { Medicamento } from '../entities/medicamento.entity';

import { ExportacionService } from '../services/exportacion.service';
import { PdfService } from '../services/pdf.service';
import { HistoriaClinicaService } from '../services/historia-clinica.service';
import { RecetaService } from '../services/receta.service';
import { EstadisticasService } from '../services/estadisticas.service';
import { ExportacionController } from '../controllers/exportacion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Turno,
      HistoriaClinica,
      HistorialMedico,
      Receta,
      User,
      Medicamento,
    ]),
  ],
  controllers: [ExportacionController],
  providers: [
    ExportacionService,
    PdfService,
    HistoriaClinicaService,
    RecetaService,
    EstadisticasService,
  ],
})
export class ExportacionModule {}