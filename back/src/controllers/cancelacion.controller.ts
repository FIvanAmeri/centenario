import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { CancelacionService } from '../services/cancelacion.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('cancelaciones')
@UseGuards(RolesGuard)
@Roles(Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
export class CancelacionController {
  constructor(private readonly service: CancelacionService) {}

  @Post()
  async registrar(@Body() body: { turnoId: number; motivo: string }) {
    return this.service.registrar(body.turnoId, body.motivo);
  }

  @Get()
  async listar() {
    return this.service.listar();
  }
}