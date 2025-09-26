import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuditoriaService } from '../services/auditoria.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('auditoria')
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.SUPERADMIN)
  @Get()
  async listar() {
    return this.auditoriaService.listarUltimas();
  }
}