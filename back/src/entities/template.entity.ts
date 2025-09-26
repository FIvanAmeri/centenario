import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ type: 'text' })
  contenido: string;

  @Column({ default: true })
  activo: boolean;
}