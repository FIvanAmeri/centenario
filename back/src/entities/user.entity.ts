import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Rol } from './rol.enum';


type EspecialidadType = string[] | null; 

@Entity({ name: 'users' }) 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) 
  nombre: string;

  @Column({ unique: true, nullable: true }) 
  email: string;

  @Column({ nullable: true }) 
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
    unique: true,
    nullable: true 
  })
  dni: string;
}