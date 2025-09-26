import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { FirmaService } from '../services/firma.service';
import { FirmaController } from '../controllers/firma.controller';
import { AuditoriaService } from '../services/auditoria.service';
import { Auditoria } from '../entities/auditoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialMedico, Auditoria])],
  controllers: [FirmaController],
  providers: [FirmaService, AuditoriaService],
})
export class FirmaModule {}