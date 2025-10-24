export interface UserResponseDto {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  especialidad: string[] | string | null;
  activo: boolean;
}