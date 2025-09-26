import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { PanelAdministrativoController } from '../controllers/panel-administrativo.controller';
import { PanelAdministrativoService } from '../services/panel-administrativo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  controllers: [PanelAdministrativoController],
  providers: [PanelAdministrativoService],
})
export class PanelAdministrativoModule {}