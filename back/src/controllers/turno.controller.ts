import { Controller, Post, Body, Patch, Param, Get, UseGuards } from '@nestjs/common';
import { TurnoService } from '../services/turno.service';
import { CrearTurnoDto } from '../dtos/crear-turno.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum'; 

@Controller('turnos')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMINISTRATIVO)
  @Post()
  async crear(@Body() dto: CrearTurnoDto) {
    return this.turnoService.crearTurno(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMINISTRATIVO, Rol.MEDICO)
  @Patch('estado/:id')
  async cambiarEstado(@Param('id') id: number, @Body('estado') estado: string) {
    return this.turnoService.cambiarEstado(id, estado);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
  @Patch('cancelar/:id')
  async cancelar(@Param('id') id: number, @Body('motivo') motivo: string) {
    return this.turnoService.cancelarTurno(id, motivo);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO)
  @Get('medico/:id')
  async listarPorMedico(@Param('id') id: number) {
    return this.turnoService.listarPorMedico(id);
  }
}