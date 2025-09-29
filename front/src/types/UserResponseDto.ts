export interface UserResponseDto {
  id: number;
  nombre: string;
  email: string;
  rol: "medico" | "administrativo" | "superadmin";
  especialidad?: string;
  activo: boolean;
}