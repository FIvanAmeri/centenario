import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { PanelAdministrativoService } from '../services/panel-administrativo.service';
import { EstadoTurno } from '../entities/turno.entity';

@Controller('panel')
export class PanelAdministrativoController {
  constructor(private readonly panelService: PanelAdministrativoService) {}

  @Get('turnos')
  async listarTurnos(
    @Query('fecha') fecha?: string,
    @Query('medicoId') medicoId?: number,
    @Query('estado') estado?: string,
  ) {
    const estadoEnum = estado && Object.values(EstadoTurno).includes(estado as EstadoTurno)
      ? (estado as EstadoTurno)
      : undefined;

    return this.panelService.listarTurnos({ fecha, medicoId, estado: estadoEnum });
  }
}