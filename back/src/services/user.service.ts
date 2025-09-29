import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Rol } from '../entities/rol.enum';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/userResponse.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import type { Express } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  async crear(data: CreateUserDto, fotoPerfil?: Express.Multer.File): Promise<UserResponseDto> {
    const hashed = await bcrypt.hash(data.password, 10);

    const nuevo = this.userRepo.create({
      ...data,
      password: hashed,
      fotoPerfil: fotoPerfil?.filename,
      activo: data.rol === Rol.MEDICO ? false : true,
    });

    const guardado = await this.userRepo.save(nuevo);

    if (data.rol === Rol.MEDICO) {
      await this.mailerService.sendMail({
        to: data.email,
        subject: 'Registro recibido - Hospital Centenario',
        template: 'registro-medico-pendiente',
        context: {
          nombre: data.nombre,
        },
      });

      const admins = await this.userRepo.find({
        where: [{ rol: Rol.SUPERADMIN }, { rol: Rol.ADMINISTRATIVO }],
      });

      for (const admin of admins) {
        await this.mailerService.sendMail({
          to: admin.email,
          subject: 'Nueva solicitud de médico',
          template: 'notificacion-superadmin',
          context: {
            nombreMedico: data.nombre,
            emailMedico: data.email,
          },
        });
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

  async listar(rol?: Rol): Promise<UserResponseDto[]> {
    const where = rol ? { rol } : {};
    const usuarios = await this.userRepo.find({ where, order: { nombre: 'ASC' } });
    return usuarios.map(this.toResponseDto);
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