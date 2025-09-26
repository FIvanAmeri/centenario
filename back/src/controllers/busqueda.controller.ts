import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BusquedaService } from '../services/busqueda.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('busqueda')
@UseGuards(RolesGuard)
@Roles(Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
export class BusquedaController {
  constructor(private readonly service: BusquedaService) {}

  @Get('turnos')
  async buscar(@Query('q') q: string) {
    return this.service.buscarTurnos(q);
  }
}