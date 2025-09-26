import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mensaje: string;

  @Column({ default: false })
  leida: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @ManyToOne(() => User)
  destinatario: User;
}