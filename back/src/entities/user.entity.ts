import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Rol } from './rol.enum';


type EspecialidadType = string[] | null; 

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


  @Column({ 
    type: 'jsonb', 
    nullable: true 
  })
  especialidad: EspecialidadType;

  @Column({ default: true })
  activo: boolean;


  @Column({ 
    type: 'varchar', 
    nullable: true 
  })
  fotoPerfil: string | null;


  @Column({ 
    unique: true
  })
  dni: string;
}