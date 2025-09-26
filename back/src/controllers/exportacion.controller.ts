import {
  Controller,
  Get,
  Query,
  UseGuards,
  StreamableFile,
} from '@nestjs/common';
import { ExportacionService } from '../services/exportacion.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('exportacion')
@UseGuards(RolesGuard)
export class ExportacionController {
  constructor(private readonly exportacionService: ExportacionService) {}

  @Roles(Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
  @Get('turnos-pdf')
  async exportarTurnosPDF(
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ): Promise<StreamableFile> {
    return this.exportacionService.exportarTurnosPDF(desde, hasta);
  }

  @Roles(Rol.MEDICO)
  @Get('historia-pdf')
  async exportarHistoriaPDF(
    @Query('pacienteId') pacienteId: number,
  ): Promise<StreamableFile> {
    return this.exportacionService.exportarHistoriaPDF(pacienteId);
  }

  @Roles(Rol.MEDICO)
  @Get('recetas-pdf')
  async exportarRecetasPDF(
    @Query('pacienteId') pacienteId: number,
  ): Promise<StreamableFile> {
    return this.exportacionService.exportarRecetasPDF(pacienteId);
  }

  @Roles(Rol.MEDICO)
  @Get('estadisticas-pdf')
  async exportarEstadisticasPDF(
    @Query('pacienteId') pacienteId: number,
  ): Promise<StreamableFile> {
    return this.exportacionService.exportarEstadisticasPDF(pacienteId);
  }

  @Roles(Rol.MEDICO, Rol.SUPERADMIN)
  @Get('metricas-pdf')
  async exportarMetricasMedicoPDF(
    @Query('medicoId') medicoId: number,
  ): Promise<StreamableFile> {
    return this.exportacionService.exportarMetricasMedicoPDF(medicoId);
  }
}