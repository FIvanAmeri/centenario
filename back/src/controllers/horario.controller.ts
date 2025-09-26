import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { HorarioService } from '../services/horario.service';
import { CrearHorarioDto } from '../dtos/crear-horario.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum'; 

@Controller('horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMINISTRATIVO)
  @Post()
  async crear(@Body() dto: CrearHorarioDto) {
    return this.horarioService.crear(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMINISTRATIVO, Rol.MEDICO)
  @Get(':usuarioId')
  async ver(@Param('usuarioId') usuarioId: number) {
    return this.horarioService.ver(usuarioId);
  }
}