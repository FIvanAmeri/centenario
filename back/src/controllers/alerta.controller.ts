import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { AlertaService } from '../services/alerta.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('alertas')
@UseGuards(RolesGuard)
@Roles(Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
export class AlertaController {
  constructor(private readonly service: AlertaService) {}

  @Get('no-leidas')
  async noLeidas() {
    return this.service.listarNoLeidas();
  }

  @Patch(':id/leida')
  async marcarLeida(@Param('id') id: number) {
    return this.service.marcarLeida(id);
  }
}