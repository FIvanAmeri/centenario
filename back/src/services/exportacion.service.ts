import { Injectable, StreamableFile } from '@nestjs/common';
import { HistoriaClinicaService } from '../services/historia-clinica.service';
import { RecetaService } from '../services/receta.service';
import { EstadisticasService } from '../services/estadisticas.service';
import { PdfService } from '../services/pdf.service';
import { TurnoService } from '../services/turno.service';

@Injectable()
export class ExportacionService {
  constructor(
    private readonly historiaService: HistoriaClinicaService,
    private readonly recetaService: RecetaService,
    private readonly estadisticasService: EstadisticasService,
    private readonly pdfService: PdfService,
    private readonly turnoService: TurnoService,
  ) {}

  async exportarTurnosPDF(desde: string, hasta: string): Promise<StreamableFile> {
    const turnos = await this.turnoService.listarTodosPorRango(new Date(desde), new Date(hasta));
    const pdf = await this.pdfService.generarTurnosPDF(turnos);
    return new StreamableFile(pdf, {
      type: 'application/pdf',
      disposition: 'attachment; filename=turnos.pdf',
    });
  }

  async exportarHistoriaPDF(pacienteId: number): Promise<StreamableFile> {
    const historia = await this.historiaService.verHistoria(pacienteId);
    const pdf = await this.pdfService.generarHistoriaPDF(historia);
    return new StreamableFile(pdf, {
      type: 'application/pdf',
      disposition: `attachment; filename=historia_${pacienteId}.pdf`,
    });
  }

  async exportarRecetasPDF(pacienteId: number): Promise<StreamableFile> {
    const recetas = await this.recetaService.obtenerPorPaciente(pacienteId);
    const pdf = await this.pdfService.generarRecetasPDF(recetas);
    return new StreamableFile(pdf, {
      type: 'application/pdf',
      disposition: `attachment; filename=recetas_${pacienteId}.pdf`,
    });
  }

  async exportarEstadisticasPDF(pacienteId: number): Promise<StreamableFile> {
    const stats = await this.estadisticasService.estadisticasPorPaciente(pacienteId);
    const pdf = await this.pdfService.generarEstadisticasPDF(stats);
    return new StreamableFile(pdf, {
      type: 'application/pdf',
      disposition: `attachment; filename=estadisticas_${pacienteId}.pdf`,
    });
  }

  async exportarMetricasMedicoPDF(medicoId: number): Promise<StreamableFile> {
    const stats = await this.estadisticasService.estadisticasPorMedico(medicoId);
    const pdf = await this.pdfService.generarMetricasMedicoPDF(stats);
    return new StreamableFile(pdf, {
      type: 'application/pdf',
      disposition: `attachment; filename=metricas_medico_${medicoId}.pdf`,
    });
  }
}