import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apellido: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  sexo: 'masculino' | 'femenino' | 'otro';

  @Column()
  fechaNacimiento: Date;

  @Column({ type: 'int' })
  edad: number;

  @Column({ nullable: true })
  domicilio: string;

  @Column()
pais: string;

  @Column({ nullable: true })
  localidad: string;

  @Column({ nullable: true })
  provincia: string;

  @Column({ nullable: true })
  barrio: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  grupoSanguineo: string;

  @Column({ nullable: true })
  alergias: string;

  @Column({ nullable: true })
  antecedentes: string;

  @Column({ nullable: true })
  discapacidad: boolean;

  @Column({ nullable: true })
  tipoDiscapacidad: string;

  @Column({ nullable: true })
  nacionalidad: string;

  @Column({ nullable: true })
  estadoCivil: 'soltera' | 'casada' | 'en pareja';

  @Column({ nullable: true })
  cantidadHijos: number;

  @CreateDateColumn()
  creadoEn: Date;
}