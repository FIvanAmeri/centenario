import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AdministrativoService } from '../services/administrativo.service';
import { CreateAdministrativoDto } from '../dtos/create-administrativo.dto';
import { Administrativo } from '../entities/administrativo.entity';

@Controller('administrativos')
export class AdministrativoController {
  constructor(private readonly administrativoService: AdministrativoService) {}

  @Post()
  async create(@Body() data: CreateAdministrativoDto): Promise<Administrativo> {
    return await this.administrativoService.create(data);
  }

  @Get()
  async findAll(): Promise<Administrativo[]> {
    return await this.administrativoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Administrativo | null> {
    return await this.administrativoService.findOne(id);
  }
}