import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { MedicamentoService } from '../services/medicamento.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum'; 

@Controller('medicamentos')
@UseGuards(RolesGuard)
@Roles(Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
export class MedicamentoController {
  constructor(private readonly service: MedicamentoService) {}

  @Post()
  async crear(@Body() body: { nombre: string; dosis: string; via: string }) {
    return this.service.crear(body.nombre, body.dosis, body.via);
  }

  @Get()
  async listar() {
    return this.service.listar();
  }
}