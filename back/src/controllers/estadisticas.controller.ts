import { Controller, Get, UseGuards } from '@nestjs/common';
import { EstadisticasService } from '../services/estadisticas.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('estadisticas')
@UseGuards(RolesGuard)
@Roles(Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
export class EstadisticasController {
  constructor(private readonly service: EstadisticasService) {}

  @Get('por-dia')
  async porDia() {
    return this.service.turnosPorDia();
  }

  @Get('por-especialidad')
  async porEspecialidad() {
    return this.service.turnosPorEspecialidad();
  }
}