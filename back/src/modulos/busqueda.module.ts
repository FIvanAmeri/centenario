import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { BusquedaService } from '../services/busqueda.service';
import { BusquedaController } from '../controllers/busqueda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  providers: [BusquedaService],
  controllers: [BusquedaController],
})
export class BusquedaModule {}