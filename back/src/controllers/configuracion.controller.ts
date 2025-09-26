import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ConfiguracionService } from '../services/configuracion.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('configuracion')
@UseGuards(RolesGuard)
@Roles(Rol.SUPERADMIN)
export class ConfiguracionController {
  constructor(private readonly service: ConfiguracionService) {}

  @Get()
  async listar() {
    return this.service.listar();
  }

  @Post()
  async actualizar(@Body() body: { clave: string; valor: string }) {
    return this.service.actualizar(body.clave, body.valor);
  }
}