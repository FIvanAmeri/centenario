export class UserResponseDto {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  especialidad?: string;
  activo: boolean;
}