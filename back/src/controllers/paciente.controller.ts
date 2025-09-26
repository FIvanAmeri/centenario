import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PacienteService } from '../services/paciente.service';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { Paciente } from '../entities/paciente.entity';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  async create(@Body() data: CreatePacienteDto): Promise<Paciente> {
    return await this.pacienteService.create(data);
  }

  @Get()
  async findAll(): Promise<Paciente[]> {
    return await this.pacienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Paciente | null> {
    return await this.pacienteService.findOne(id);
  }
}