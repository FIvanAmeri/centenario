import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ReprogramacionService } from '../services/reprogramacion.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('reprogramacion')
export class ReprogramacionController {
  constructor(private readonly reprogramacionService: ReprogramacionService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMINISTRATIVO)
  @Patch(':turnoId')
  async reprogramar(
    @Param('turnoId') turnoId: number,
    @Body() body: { nuevaFecha: string; nuevaHora: string; motivo: string },
  ) {
    return this.reprogramacionService.reprogramarTurno(
      turnoId,
      body.nuevaFecha,
      body.nuevaHora,
      body.motivo,
    );
  }
}