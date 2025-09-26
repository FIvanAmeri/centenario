import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { FirmaService } from '../services/firma.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../entities/rol.enum'; 

@Controller('firma')
export class FirmaController {
  constructor(private readonly firmaService: FirmaService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.MEDICO)
  @Patch(':registroId')
  async firmar(
    @Param('registroId') registroId: number,
    @Body('medicoId') medicoId: number
  ) {
    return this.firmaService.firmarRegistro(registroId, medicoId);
  }
}