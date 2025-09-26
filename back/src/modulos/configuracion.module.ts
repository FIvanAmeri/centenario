import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuracion } from '../entities/configuracion.entity';
import { ConfiguracionService } from '../services/configuracion.service';
import { ConfiguracionController } from '../controllers/configuracion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Configuracion])],
  providers: [ConfiguracionService],
  controllers: [ConfiguracionController],
  exports: [ConfiguracionService],
})
export class ConfiguracionModule {}