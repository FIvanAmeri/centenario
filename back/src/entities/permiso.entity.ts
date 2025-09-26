import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type Rol = 'medico' | 'admin' | 'superadmin';

@Entity()
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol: Rol;

  @Column()
  accion: string;

  @Column({ default: true })
  permitido: boolean;
}