import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Rol } from '../entities/rol.enum';

@Controller('users')
@UseGuards(RolesGuard)
@Roles(Rol.SUPERADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listar() {
    return this.userService.listar();
  }

  @Get(':id')
  async obtener(@Param('id') id: number) {
    return this.userService.obtener(id);
  }

  @Post()
  async crear(@Body() body: CreateUserDto) {
    return this.userService.crear(body);
  }

  @Patch(':id')
  async editar(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.editar(id, body);
  }

  @Patch(':id/activar')
  async activar(@Param('id') id: number) {
    return this.userService.activar(id);
  }

  @Patch(':id/desactivar')
  async desactivar(@Param('id') id: number) {
    return this.userService.desactivar(id);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    return this.userService.eliminar(id);
  }
}