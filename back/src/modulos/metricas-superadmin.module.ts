import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { User } from '../entities/user.entity';
import { Horario } from '../entities/horario.entity';
import { MetricasSuperadminService } from '../services/metricas-superadmin.service';
import { MetricasSuperadminController } from '../controllers/metricas-superadmin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, HistorialMedico, User, Horario])],
  controllers: [MetricasSuperadminController],
  providers: [MetricasSuperadminService],
})
export class MetricasSuperadminModule {}