import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Rol } from '../entities/rol.enum';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async crear(data: CreateUserDto) {
    const nuevo = this.userRepo.create(data);
    return this.userRepo.save(nuevo);
  }

  async editar(id: number, cambios: UpdateUserDto) {
    await this.userRepo.update(id, cambios);
    return this.obtener(id);
  }

  async activar(id: number) {
    await this.userRepo.update(id, { activo: true });
  }

  async desactivar(id: number) {
    await this.userRepo.update(id, { activo: false });
  }

  async listar(rol?: Rol) {
    const where = rol ? { rol } : {};
    return this.userRepo.find({ where });
  }

  async eliminar(id: number) {
    await this.userRepo.delete(id);
  }

  async obtener(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}