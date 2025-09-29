import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../services/user.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Rol } from '../entities/rol.enum';
import { UserResponseDto } from '../dtos/userResponse.dto';
import type { Express } from 'express';

@Controller('users')
@UseGuards(RolesGuard)
@Roles(Rol.SUPERADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listar(): Promise<UserResponseDto[]> {
    return this.userService.listar();
  }

  @Get(':id')
  async obtener(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    const user = await this.userService.obtener(id);
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      especialidad: user.especialidad,
      activo: user.activo,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('fotoPerfil'))
  async crear(
    @UploadedFile() fotoPerfil: Express.Multer.File,
    @Body() body: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.crear(body, fotoPerfil);
  }

  @Patch(':id')
  async editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.editar(id, body);
  }

  @Patch(':id/activar')
  async activar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.activar(id);
  }

  @Patch(':id/desactivar')
  async desactivar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.desactivar(id);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.eliminar(id);
  }
}