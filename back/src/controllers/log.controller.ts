import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LogService } from '../services/log.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('logs')
@UseGuards(RolesGuard)
@Roles(Rol.SUPERADMIN)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async listar(@Query('tipo') tipo?: 'error' | 'info' | 'warning') {
    return this.logService.listar(tipo);
  }
}