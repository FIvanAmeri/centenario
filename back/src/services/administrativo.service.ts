import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrativo } from '../entities/administrativo.entity';
import { CreateAdministrativoDto } from '../dtos/create-administrativo.dto';
import dayjs from 'dayjs'; 

@Injectable()
export class AdministrativoService {
  constructor(
    @InjectRepository(Administrativo)
    private readonly administrativoRepository: Repository<Administrativo>,
  ) {}

  async create(data: CreateAdministrativoDto): Promise<Administrativo> {
    const { repetirPassword, fechaNacimiento, ...rest } = data;

    const edadCalculada = dayjs().diff(fechaNacimiento, 'year');

    const administrativo = this.administrativoRepository.create({
      ...rest,
      edad: edadCalculada,
    });

    return await this.administrativoRepository.save(administrativo);
  }

  async findAll(): Promise<Administrativo[]> {
    return await this.administrativoRepository.find();
  }

  async findOne(id: number): Promise<Administrativo | null> {
    return await this.administrativoRepository.findOne({ where: { id } });
  }
}