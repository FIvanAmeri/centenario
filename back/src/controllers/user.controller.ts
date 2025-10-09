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

  
  @Post('public')
  @UsePipes()
  @UseInterceptors(FileInterceptor('fotoPerfil'))
  async registrarMedicoPublico(
    @UploadedFile() fotoPerfil: Express.Multer.File,
    @Body() rawBody: Record<string, unknown>,
  ): Promise<UserResponseDto> {
    let horariosParsed: HorarioDto[] = [];
    let especialidadParsed: string[] | undefined = undefined;

    if (rawBody.horarios && typeof rawBody.horarios === 'string') {
      try {
        horariosParsed = JSON.parse(rawBody.horarios as string) as HorarioDto[];
      } catch (e) {
        throw new BadRequestException('El campo horarios está corrupto y no es JSON válido.');
      }
    }
    

    if (rawBody.especialidad) {
        const especialidadRaw = String(rawBody.especialidad);

        if (especialidadRaw.startsWith('[') && especialidadRaw.endsWith(']')) {
            try {
                especialidadParsed = JSON.parse(especialidadRaw) as string[];
            } catch (e) {
            }
        }
        
 
        if (!especialidadParsed || especialidadParsed.length === 0) {
            if (especialidadRaw.trim() !== '') {
                 especialidadParsed = [especialidadRaw.trim()];
            } else {
                 especialidadParsed = undefined;
            }
        }
    }


    const medicoData: CreateUserDto = {
      nombre: String(rawBody.nombre ?? ''),
      email: String(rawBody.email ?? ''),
      password: String(rawBody.password ?? ''),
      rol: (rawBody.rol as Rol) ?? Rol.MEDICO,
      dni: String(rawBody.dni ?? ''),
      fechaNacimiento: String(rawBody.fechaNacimiento ?? ''),
      telefono: String(rawBody.telefono ?? ''),
      direccion: String(rawBody.direccion ?? ''),
      matricula: String(rawBody.matricula ?? ''),
      especialidad: especialidadParsed, 
      horarios: horariosParsed,
    };

    const finalDto = plainToInstance(CreateUserDto, medicoData);
    const errors = await validate(finalDto, { whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.userService.crear(finalDto, fotoPerfil);
  }

  @Get('pendientes')
  async listarPendientes(): Promise<UserResponseDto[]> {
    return this.userService.listarPendientes();
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

  @Patch(':id/aprobacion')
  async actualizarAprobacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AprobarUsuarioDto,
  ): Promise<void> {
    return this.userService.actualizarAprobacion(id, dto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.eliminar(id);
  }
}