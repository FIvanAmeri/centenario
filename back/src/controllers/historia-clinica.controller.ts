import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HistoriaClinicaService } from '../services/historia-clinica.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum'; 

@Controller('historia-clinica')
export class HistoriaClinicaController {
  constructor(private readonly historiaService: HistoriaClinicaService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO)
  @Get(':pacienteId')
  async verHistoria(@Param('pacienteId') pacienteId: number) {
    return this.historiaService.verHistoria(pacienteId);
  }
}