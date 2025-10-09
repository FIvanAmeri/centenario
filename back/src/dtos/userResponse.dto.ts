import { Rol } from '../entities/rol.enum'; 

export class UserResponseDto {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
  especialidad: string[] | null; 
  activo: boolean;
}