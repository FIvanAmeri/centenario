import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Administrativo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  area: string; // menú desplegable, validado en el DTO

  @Column({ type: 'json' })
  diasTrabajo: { dia: string; horaInicio: string; horaFin: string }[];

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fotoPerfil?: string;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'int' })
  edad: number; // se calcula automáticamente en el service

  @Column({ type: 'varchar', length: 20, unique: true })
  dni: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  repetirPassword: string;
}