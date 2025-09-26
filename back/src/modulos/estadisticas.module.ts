import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { EstadisticasService } from '../services/estadisticas.service';
import { EstadisticasController } from '../controllers/estadisticas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  providers: [EstadisticasService],
  controllers: [EstadisticasController],
})
export class EstadisticasModule {}