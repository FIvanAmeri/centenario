import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { TemplateService } from '../services/template.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum'; 
@Controller('templates')
@UseGuards(RolesGuard)
@Roles(Rol.SUPERADMIN)
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  async listar() {
    return this.templateService.listar();
  }

  @Post()
  async crear(@Body() body: { nombre: string; contenido: string }) {
    return this.templateService.crear(body.nombre, body.contenido);
  }

  @Patch(':id')
  async editar(@Param('id') id: number, @Body() body: { contenido: string }) {
    return this.templateService.editar(id, body.contenido);
  }

  @Patch(':id/desactivar')
  async desactivar(@Param('id') id: number) {
    return this.templateService.desactivar(id);
  }
}