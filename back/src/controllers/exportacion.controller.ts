import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ExportacionService } from '../services/exportacion.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('exportacion')
@UseGuards(RolesGuard)
@Roles(Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
export class ExportacionController {
  constructor(private readonly exportacionService: ExportacionService) {}

  @Get('turnos')
  async exportarTurnos(@Query('desde') desde: string, @Query('hasta') hasta: string) {
    return this.exportacionService.exportarTurnosCSV(desde, hasta);
  }
}