import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { NotificacionService } from '../services/notificacion.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';
@Controller('notificaciones')
export class NotificacionController {
  constructor(private readonly notiService: NotificacionService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO, Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
  @Get(':usuarioId')
  async listar(@Param('usuarioId') usuarioId: number) {
    return this.notiService.listar(usuarioId);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMINISTRATIVO, Rol.SUPERADMIN)
  @Post('enviar')
  async enviar(@Body() body: { mensaje: string; usuarioId: number }) {
    return this.notiService.enviar(body.mensaje, body.usuarioId);
  }
}