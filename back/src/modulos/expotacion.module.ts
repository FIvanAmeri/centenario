import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { ExportacionService } from '../services/exportacion.service';
import { ExportacionController } from '../controllers/exportacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  controllers: [ExportacionController],
  providers: [ExportacionService],
})
export class ExportacionModule {}