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
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserService } from '../services/user.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto, HorarioDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AprobarUsuarioDto } from '../dtos/aprobar-usuario.dto';
import { Rol } from '../entities/rol.enum';
import { GuardiaJwt } from '../auth/guardia-jwt';
import { UserResponseDto } from '../dtos/userResponse.dto';
import type { Express } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(GuardiaJwt, RolesGuard)
  @Roles(Rol.SUPERADMIN)
  async listar(): Promise<UserResponseDto[]> {
    return this.userService.listar();
  }

  @Get(':id')
  @UseGuards(GuardiaJwt, RolesGuard)
  @Roles(Rol.SUPERADMIN)
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
  @UseGuards(GuardiaJwt, RolesGuard)
  @Roles(Rol.SUPERADMIN)
  @UseInterceptors(FileInterceptor('fotoPerfil'))
  async crear(
    @UploadedFile() fotoPerfil: Express.Multer.File,
    @Body() body: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.crear(body, fotoPerfil);
  }

  @Get('pendientes')
  @UseGuards(GuardiaJwt, RolesGuard)
  @Roles(Rol.SUPERADMIN)
  async listarPendientes(): Promise<UserResponseDto[]> {
    return this.userService.listarPendientes();
  }

  @Patch(':id')
  @UseGuards(GuardiaJwt, RolesGuard)
  @Roles(Rol.SUPERADMIN)
  async editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.editar(id, body);
  }

  @Patch(':id/activar')
  @UseGuards(GuardiaJwt, RolesGuard)
  @Roles(Rol.SUPERADMIN)
  async activar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.activar(id);
  }

  @Patch(':id/desactivar')
  @UseGuards(GuardiaJwt, RolesGuard)
  @Roles(Rol.SUPERADMIN)
  async desactivar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.desactivar(id);
  }

  @Patch(':id/aprobacion')
  @UseGuards(GuardiaJwt, RolesGuard)
  @Roles(Rol.SUPERADMIN)
  async actualizarAprobacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AprobarUsuarioDto,
  ): Promise<void> {
    return this.userService.actualizarAprobacion(id, dto);
  }

  @Delete(':id')
  @UseGuards(GuardiaJwt, RolesGuard)
  @Roles(Rol.SUPERADMIN)
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.eliminar(id);
  }
}