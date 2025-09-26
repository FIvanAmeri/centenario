import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Medicamento } from './medicamento.entity';

@Entity()
export class Receta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @ManyToOne(() => User)
  medico: User;

  @ManyToOne(() => User)
  paciente: User;

  @ManyToMany(() => Medicamento, { cascade: true })
  @JoinTable()
  medicamentos: Medicamento[];

  @Column({ default: false })
  firmada: boolean;

  @CreateDateColumn()
  creadaEn: Date;
}