import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { PermisoService } from '../services/permiso.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('permisos')
@UseGuards(RolesGuard)
@Roles(Rol.SUPERADMIN)
export class PermisoController {
  constructor(private readonly service: PermisoService) {}

  @Get()
  async listar(@Query('rol') rol: Rol) {
    return this.service.listarPorRol(rol);
  }

  @Post()
  async actualizar(@Body() body: { rol: Rol; accion: string; permitido: boolean }) {
    return this.service.actualizar(body.rol, body.accion, body.permitido);
  }
}