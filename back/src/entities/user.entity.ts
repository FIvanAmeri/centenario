import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Rol } from './rol.enum';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.MEDICO,
  })
  rol: Rol;

  @Column({ nullable: true })
  especialidad?: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ nullable: true })
  fotoPerfil?: string;
}