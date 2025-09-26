import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorDto } from '../dtos/create-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async create(data: CreateDoctorDto): Promise<Doctor> {
    const { repetirPassword, ...doctorData } = data;
    const doctor = this.doctorRepository.create(doctorData);
    return await this.doctorRepository.save(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find();
  }

  async findOne(id: number): Promise<Doctor | null> {
    return await this.doctorRepository.findOne({ where: { id } });
  }
}