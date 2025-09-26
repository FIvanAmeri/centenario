import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../entities/paciente.entity';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import dayjs from 'dayjs';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(data: CreatePacienteDto): Promise<Paciente> {
    const {
      fechaNacimiento,
      sexo,
      apellido,
      nombre,
      dni,
      pais,
      ...rest
    } = data;

    const fechaNacimientoDate = new Date(fechaNacimiento);
    const edadCalculada = dayjs().diff(fechaNacimientoDate, 'year');

    const paciente = new Paciente();
    paciente.apellido = apellido;
    paciente.nombre = nombre;
    paciente.dni = dni;
    paciente.sexo = sexo as 'masculino' | 'femenino' | 'otro';
    paciente.fechaNacimiento = fechaNacimientoDate;
    paciente.edad = edadCalculada;
    paciente.pais = pais;

    if (rest.domicilio) paciente.domicilio = rest.domicilio;
    if (rest.localidad) paciente.localidad = rest.localidad;
    if (rest.provincia) paciente.provincia = rest.provincia;
    if (rest.barrio) paciente.barrio = rest.barrio;
    if (rest.telefono) paciente.telefono = rest.telefono;
    if (rest.email) paciente.email = rest.email;
    if (rest.grupoSanguineo) paciente.grupoSanguineo = rest.grupoSanguineo;
    if (rest.alergias) paciente.alergias = rest.alergias;
    if (rest.antecedentes) paciente.antecedentes = rest.antecedentes;
    if (rest.discapacidad !== undefined) paciente.discapacidad = rest.discapacidad;
    if (rest.tipoDiscapacidad) paciente.tipoDiscapacidad = rest.tipoDiscapacidad;
    if (rest.nacionalidad) paciente.nacionalidad = rest.nacionalidad;
    if (rest.estadoCivil) paciente.estadoCivil = rest.estadoCivil as 'soltera' | 'casada' | 'en pareja';
    if (rest.cantidadHijos !== undefined) paciente.cantidadHijos = rest.cantidadHijos;

    return await this.pacienteRepository.save(paciente);
  }

  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepository.find();
  }

  async findOne(id: number): Promise<Paciente | null> {
    return await this.pacienteRepository.findOne({ where: { id } });
  }
}