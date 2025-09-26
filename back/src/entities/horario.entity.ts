import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dia: string; // ej: 'lunes', 'martes'

  @Column()
  desde: string; // ej: '08:00'

  @Column()
  hasta: string; // ej: '14:00'

  @ManyToOne(() => User)
  usuario: User;
}