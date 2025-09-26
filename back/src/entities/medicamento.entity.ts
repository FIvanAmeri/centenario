import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Medicamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  dosis: string;

  @Column()
  via: string;

  @Column()
  frecuencia: string; 
}