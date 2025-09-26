import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from '../entities/template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateService {
  constructor(@InjectRepository(Template) private templateRepo: Repository<Template>) {}

  async obtener(nombre: string): Promise<string> {
    const tpl = await this.templateRepo.findOne({ where: { nombre, activo: true } });
    if (!tpl) throw new Error(`Plantilla "${nombre}" no encontrada`);
    return tpl.contenido;
  }

  async crear(nombre: string, contenido: string) {
    const tpl = this.templateRepo.create({ nombre, contenido });
    return this.templateRepo.save(tpl);
  }

  async editar(id: number, contenido: string) {
    await this.templateRepo.update(id, { contenido });
    return this.templateRepo.findOne({ where: { id } });
  }

  async listar() {
    return this.templateRepo.find({ order: { nombre: 'ASC' } });
  }

  async desactivar(id: number) {
    await this.templateRepo.update(id, { activo: false });
  }
}