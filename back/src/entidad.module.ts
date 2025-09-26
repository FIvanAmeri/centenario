import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Paciente,
  Doctor,
  Turno,
  Cancelacion,
  Horario,
  HistoriaClinica,
  HistorialMedico,
  Receta,
  Medicamento,
  Auditoria,
  Log,
  Notificacion,
  Alerta,
  Template,
  Configuracion,
  Permiso,
} from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    Paciente,
    Doctor,
    Turno,
    Cancelacion,
    Horario,
    HistoriaClinica,
    HistorialMedico,
    Receta,
    Medicamento,
    Auditoria,
    Log,
    Notificacion,
    Alerta,
    Template,
    Configuracion,
    Permiso,
  ])],
  exports: [TypeOrmModule],
})
export class EntidadModule {}