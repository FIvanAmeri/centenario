import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: 'error' | 'info' | 'warning';

  @Column()
  mensaje: string;

  @Column({ nullable: true })
  modulo?: string;

  @CreateDateColumn()
  fecha: Date;
}