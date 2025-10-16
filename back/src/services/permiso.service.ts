import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from '../entities/permiso.entity'; 
import { Rol } from '../entities/rol.enum'; 


@Injectable()
export class PermisoService {
  constructor(@InjectRepository(Permiso) private repo: Repository<Permiso>) {}

  async puede(rol: Rol, accion: string): Promise<boolean> {
    const permiso = await this.repo.findOne({ where: { rol, accion } });
    return permiso?.permitido ?? false;
  }

  async listarPorRol(rol: Rol) {
    return this.repo.find({ where: { rol }, order: { accion: 'ASC' } });
  }

  async actualizar(rol: Rol, accion: string, permitido: boolean) {
    const existente = await this.repo.findOne({ where: { rol, accion } });
    if (existente) {
      existente.permitido = permitido;
      return this.repo.save(existente);
    }
    return this.repo.save(this.repo.create({ rol, accion, permitido }));
  }
}