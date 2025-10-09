import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dia: string;

  @Column()
  desde: string;

  @Column()
  hasta: string;

  @ManyToOne(() => User)
  usuario: User;
}