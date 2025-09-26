import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HistoriaClinica } from './historia-clinica.entity';
import { User } from './user.entity';

@Entity()
export class HistorialMedico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: string;

  @Column()
  motivoConsulta: string;

  @Column()
  diagnostico: string;

  @Column()
  tratamiento: string;

  @Column({ default: false })
  firmado: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fechaFirma: Date;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaEdicion: Date;

  @Column({ default: false })
  editado: boolean;

  @ManyToOne(() => User)
  medico: User;

  @ManyToOne(() => HistoriaClinica, (historia) => historia.registros)
  historia: HistoriaClinica;
}