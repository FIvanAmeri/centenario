import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MetricasService } from '../services/metricas.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum'; 

@Controller('metricas')
export class MetricasController {
  constructor(private readonly metricasService: MetricasService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.SUPERADMIN)
  @Get('medico/:id')
  async porMedico(@Param('id') id: number) {
    return this.metricasService.obtenerPorMedico(id);
  }
}