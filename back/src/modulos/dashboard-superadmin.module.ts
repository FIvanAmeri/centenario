import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardSuperadminController } from '../controllers/dashboard-superadmin.controller';
import { DashboardSuperadminService } from '../services/dashboard-superadmin.service';
import { User } from '../entities/user.entity';
import { Turno } from '../entities/turno.entity';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { Auditoria } from '../entities/auditoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Turno, HistorialMedico, Auditoria])],
  controllers: [DashboardSuperadminController],
  providers: [DashboardSuperadminService],
})
export class DashboardSuperadminModule {}