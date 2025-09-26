import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardSuperadminService } from '../services/dashboard-superadmin.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum';

@Controller('dashboard/superadmin')
export class DashboardSuperadminController {
  constructor(private readonly dashboardService: DashboardSuperadminService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.SUPERADMIN)
  @Get()
  async obtener() {
    return this.dashboardService.obtenerResumen();
  }
}