import { Controller, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { HistoriaClinicaService } from '../services/historia-clinica.service';
import { CrearHistorialDto } from '../dtos/crear-historial.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('historial-medico')
export class HistorialMedicoController {
  constructor(private readonly historiaService: HistoriaClinicaService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO)
  @Post(':pacienteId')
  async agregarRegistro(
    @Param('pacienteId') pacienteId: number,
    @Body() dto: CrearHistorialDto
  ) {
    return this.historiaService.agregarRegistro(pacienteId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO)
  @Patch('firmar/:registroId')
  async firmar(@Param('registroId') registroId: number) {
    return this.historiaService.firmarRegistro(registroId);
  }
}