import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alerta } from '../entities/alerta.entity';
import { AlertaService } from '../services/alerta.service';
import { AlertaController } from '../controllers/alerta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alerta])],
  providers: [AlertaService],
  controllers: [AlertaController],
  exports: [AlertaService],
})
export class AlertaModule {}