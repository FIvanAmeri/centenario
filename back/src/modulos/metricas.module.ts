import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricasController } from '../controllers/metricas.controller';
import { MetricasService } from '../services/metricas.service';
import { User } from '../entities/user.entity';
import { Turno } from '../entities/turno.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Turno, HistorialMedico])],
  controllers: [MetricasController],
  providers: [MetricasService],
})
export class MetricasModule {}