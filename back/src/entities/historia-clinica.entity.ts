import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { HistorialMedico } from './historial-medico.entity';

@Entity()
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  paciente: User;

  @OneToMany(() => HistorialMedico, (registro) => registro.historia, { cascade: true })
  registros: HistorialMedico[];
}