export interface FormularioMedico {
  nombre: string;
  email: string;
  dni: string;
  fechaNacimiento: string;
  especialidad: string;
  telefono: string;
  direccion: string;
  matricula: string;
  password: string;
  repetirPassword: string;
  fotoPerfil: File | null;  // 👈 cambio acá
}
