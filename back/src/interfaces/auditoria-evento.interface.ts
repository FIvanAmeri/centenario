// src/interfaces/auditoria-evento.interface.ts
export interface AuditoriaEvento {
  id: number;
  entidad: string;
  accion: string;
  detalles?: Record<string, unknown>;
}