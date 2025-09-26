import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DoctorService } from '../services/doctor.service';
import { CreateDoctorDto } from '../dtos/create-doctor.dto';
import { Doctor } from '../entities/doctor.entity';

@Controller('doctores')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() data: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorService.create(data);
  }

  @Get()
  async findAll(): Promise<Doctor[]> {
    return await this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Doctor | null> {
    return await this.doctorService.findOne(id);
  }
}