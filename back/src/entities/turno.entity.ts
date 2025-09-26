import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export enum EstadoTurno {
  AGENDADO = 'Agendado',
  CONFIRMADO = 'Confirmado',
  EN_SALA_DE_ESPERA = 'En sala de espera',
  ATENDIDO = 'Atendido',
  NO_VINO = 'No vino',
}

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column()
  hora: string;

  @Column({
    type: 'enum',
    enum: EstadoTurno,
    default: EstadoTurno.AGENDADO,
  })
  estado: EstadoTurno;

  @ManyToOne(() => User)
  paciente: User;

  @ManyToOne(() => User)
  medico: User;
}