import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { RecetaService } from '../services/receta.service';
import { CrearRecetaDto } from '../dtos/crear-receta.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('recetas')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO)
  @Post()
  async crear(@Body() dto: CrearRecetaDto) {
    return this.recetaService.crearReceta(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO)
  @Patch('firmar/:id')
  async firmar(@Param('id') id: number) {
    return this.recetaService.firmarReceta(id);
  }
}