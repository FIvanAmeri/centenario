import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Cancelacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  turnoId: number;

  @Column()
  motivo: string;

  @CreateDateColumn()
  fecha: Date;
}