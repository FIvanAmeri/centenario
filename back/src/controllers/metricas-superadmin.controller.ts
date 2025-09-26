import { Controller, Get, UseGuards } from '@nestjs/common';
import { MetricasSuperadminService } from '../services/metricas-superadmin.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('metricas/superadmin')
export class MetricasSuperadminController {
  constructor(private readonly metricasService: MetricasSuperadminService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.SUPERADMIN)
  @Get()
  async obtener() {
    return this.metricasService.obtener();
  }
}