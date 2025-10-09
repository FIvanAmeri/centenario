import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import type { Express } from 'express';

import { User } from '../entities/user.entity';
import { Rol } from '../entities/rol.enum';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AprobarUsuarioDto } from '../dtos/aprobar-usuario.dto';
import { UserResponseDto } from '../dtos/userResponse.dto';
import { MailService } from '../mail/mail.service';
import { HorarioService } from '../services/horario.service';
import { CrearHorarioDto } from '../dtos/crear-horario.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailerService: MailService,
    private readonly horarioService: HorarioService,
  ) {}

  async crear(
    data: CreateUserDto,
    fotoPerfil?: Express.Multer.File,
  ): Promise<UserResponseDto> {
    const exists = await this.userRepo.findOne({
      where: [{ email: data.email }, { dni: data.dni }],
    });
    if (exists) {
      throw new ConflictException('Ya existe un usuario con ese email o dni');
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const nuevo = this.userRepo.create({
      ...data,
      password: hashed,
      fotoPerfil: fotoPerfil?.filename ?? null,
      activo: data.rol === Rol.MEDICO ? false : true, 
    });

    let guardado: User;
    try {
      guardado = await this.userRepo.save(nuevo);
    } catch (err) {
      this.logger.error('Error guardando usuario', err as Error);
      throw new InternalServerErrorException('Error al crear usuario');
    }


    if (Array.isArray(data.horarios) && data.horarios.length > 0) {
      for (const h of data.horarios as CrearHorarioDto[]) {
        try {
          await this.horarioService.crear({
            ...h,
            usuarioId: guardado.id,
          });
        } catch (err) {
          this.logger.warn(
            `No se pudo crear horario para usuario ${guardado.id}: ${
              (err as Error).message
            }`,
          );
        }
      }
    }

  
    if (data.rol === Rol.MEDICO) {
      try {
        await this.mailerService.sendMail({
          to: data.email,
          subject: 'Registro recibido - Hospital Centenario',
          template: 'registro-medico-pendiente',
          context: { nombre: data.nombre },
        });
      } catch (err) {
        this.logger.error(
          'Error enviando mail al médico',
          (err as Error).message,
        );
      }

      try {
        const admins = await this.userRepo.find({
          where: [{ rol: Rol.SUPERADMIN }, { rol: Rol.ADMINISTRATIVO }],
        });

        for (const admin of admins) {
          try {
            await this.mailerService.sendMail({
              to: admin.email,
              subject: 'Nueva solicitud de médico',
              template: 'notificacion-superadmin',
              context: {
                nombreMedico: data.nombre,
                emailMedico: data.email,
              },
            });
          } catch (err) {
            this.logger.warn(
              `No se pudo notificar al admin ${admin.email}: ${
                (err as Error).message
              }`,
            );
          }
        }
      } catch (err) {
        this.logger.error(
          'Error obteniendo admins para notificación',
          (err as Error).message,
        );
      }
    }

    return this.toResponseDto(guardado);
  }

  async editar(id: number, cambios: UpdateUserDto): Promise<UserResponseDto> {
    if (cambios.password) {
      cambios.password = await bcrypt.hash(cambios.password, 10);
    }
    await this.userRepo.update(id, cambios); 
    const actualizado = await this.obtener(id);
    return this.toResponseDto(actualizado);
  }

  async activar(id: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    await this.userRepo.update(id, { activo: true });
  }

  async desactivar(id: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    await this.userRepo.update(id, { activo: false });
  }

  async actualizarAprobacion(id: number, dto: AprobarUsuarioDto): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.userRepo.update(id, { activo: dto.aprobado });

    try {
      await this.mailerService.notificarRespuestaSuperadmin(
        user.email,
        dto.aprobado,
      );
    } catch (err) {
      this.logger.warn(
        `Fallo al notificar por mail a ${user.email}: ${
          (err as Error).message
        }`,
      );
    }
  }

  async listar(rol?: Rol): Promise<UserResponseDto[]> {
    const where = rol ? { rol } : {};
    const usuarios = await this.userRepo.find({
      where,
      order: { nombre: 'ASC' },
    });
    return usuarios.map((u) => this.toResponseDto(u));
  }

  async listarPendientes(): Promise<UserResponseDto[]> {
    const usuarios = await this.userRepo.find({
      where: { rol: Rol.MEDICO, activo: false },
      order: { nombre: 'ASC' },
    });
    return usuarios.map((u) => this.toResponseDto(u));
  }

  async eliminar(id: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    await this.userRepo.delete(id);
  }

  async obtener(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  private toResponseDto(user: User): UserResponseDto {
    const { id, nombre, email, rol, especialidad, activo } = user;
    return { id, nombre, email, rol, especialidad, activo };
  }
}