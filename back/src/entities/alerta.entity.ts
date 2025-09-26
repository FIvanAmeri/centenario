import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Alerta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mensaje: string;

  @Column()
  tipo: 'error' | 'sistema' | 'turno' | 'seguridad';

  @Column({ default: false })
  leida: boolean;

  @CreateDateColumn()
  fecha: Date;
}