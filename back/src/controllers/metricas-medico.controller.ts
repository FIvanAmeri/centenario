import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MetricasMedicoService } from '../services/metricas-medico.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('metricas/medico')
export class MetricasMedicoController {
  constructor(private readonly metricasService: MetricasMedicoService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO)
  @Get(':medicoId')
  async obtener(@Param('medicoId') medicoId: number) {
    return this.metricasService.obtenerPorMedico(medicoId);
  }
}