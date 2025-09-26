import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PanelMedicoService } from '../services/panel-medico.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum'; 

@Controller('panel/medico')
export class PanelMedicoController {
  constructor(private readonly panelService: PanelMedicoService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO)
  @Get(':medicoId')
  async obtener(@Param('medicoId') medicoId: number) {
    return this.panelService.obtenerResumen(medicoId);
  }
}