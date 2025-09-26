import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { HistoriaClinica } from '../entities/historia-clinica.entity';
import { Receta } from '../entities/receta.entity';
import { EstadisticasPacienteDto } from '../dtos/estadistica-paciente.dto';
import { Turno } from '../entities/turno.entity';

@Injectable()
export class PdfService {
  async generarHistoriaPDF(historia: HistoriaClinica): Promise<Buffer> {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {});

    doc.fontSize(18).text('Historia Clínica', { align: 'center' });

    doc
      .moveDown()
      .fontSize(12)
      .text(`Paciente: ${historia.paciente?.nombre ?? '—'}`)
      .text(`Email: ${historia.paciente?.email ?? '—'}`)
      .text(`Especialidad: ${historia.paciente?.especialidad ?? '—'}`);

    doc.moveDown().text('Registros médicos:');

    historia.registros?.forEach((registro, index) => {
      doc
        .moveDown()
        .fontSize(12)
        .text(`Registro #${index + 1}`)
        .text(`Fecha: ${registro.fecha ?? '—'}`)
        .text(`Motivo de consulta: ${registro.motivoConsulta ?? '—'}`)
        .text(`Diagnóstico: ${registro.diagnostico ?? '—'}`)
        .text(`Tratamiento: ${registro.tratamiento ?? '—'}`)
        .text(`Firmado: ${registro.firmado ? 'Sí' : 'No'}`)
        .text(
          `Médico: ${registro.medico?.nombre ?? '—'} (${registro.medico?.especialidad ?? '—'})`
        );
    });

    doc.end();
    return Buffer.concat(buffers);
  }

  async generarRecetasPDF(recetas: Receta[]): Promise<Buffer> {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {});

    doc.fontSize(18).text('Recetas Médicas', { align: 'center' });

    recetas.forEach((r, index) => {
      doc
        .moveDown()
        .fontSize(12)
        .text(`Receta #${index + 1}`)
        .text(`Fecha: ${r.fecha?.toLocaleDateString() ?? '—'}`)
        .text(`Descripción: ${r.descripcion ?? '—'}`)
        .text(`Firmada: ${r.firmada ? 'Sí' : 'No'}`)
        .text(`Medicamentos: ${r.medicamentos?.map((m) => m.nombre).join(', ') ?? '—'}`)
        .text(`Médico: ${r.medico?.nombre ?? '—'} (${r.medico?.especialidad ?? '—'})`);
    });

    doc.end();
    return Buffer.concat(buffers);
  }

  async generarEstadisticasPDF(stats: EstadisticasPacienteDto): Promise<Buffer> {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {});

    doc.fontSize(18).text('Estadísticas Médicas', { align: 'center' });

    doc.moveDown().fontSize(12).text(`Total de consultas: ${stats.totalConsultas ?? 0}`);

    doc.moveDown().text('Diagnósticos frecuentes:');
    stats.diagnosticosFrecuentes?.forEach((d) =>
      doc.text(`- ${d.diagnostico}: ${d.cantidad}`)
    );

    doc.moveDown().text('Consultas por mes:');
    stats.consultasPorMes?.forEach((m) =>
      doc.text(`- ${m.mes}: ${m.cantidad}`)
    );

    doc.end();
    return Buffer.concat(buffers);
  }

  async generarMetricasMedicoPDF(stats: EstadisticasPacienteDto): Promise<Buffer> {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {});

    doc.fontSize(18).text('Métricas del Médico', { align: 'center' });

    doc.moveDown().fontSize(12).text(`Total de consultas realizadas: ${stats.totalConsultas ?? 0}`);

    doc.moveDown().text('Diagnósticos frecuentes:');
    stats.diagnosticosFrecuentes?.forEach((d) =>
      doc.text(`- ${d.diagnostico}: ${d.cantidad}`)
    );

    doc.moveDown().text('Consultas por mes:');
    stats.consultasPorMes?.forEach((m) =>
      doc.text(`- ${m.mes}: ${m.cantidad}`)
    );

    doc.end();
    return Buffer.concat(buffers);
  }

  async generarTurnosPDF(turnos: Turno[]): Promise<Buffer> {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {});

    doc.fontSize(18).text('Turnos Médicos', { align: 'center' });

    turnos.forEach((t, index) => {
      doc
        .moveDown()
        .fontSize(12)
        .text(`Turno #${index + 1}`)
        .text(`Fecha: ${t.fecha?.toLocaleDateString('es-AR') ?? '—'}`)
        .text(`Hora: ${t.hora ?? '—'}`)
        .text(`Paciente: ${t.paciente?.nombre ?? '—'}`)
        .text(`Médico: ${t.medico?.nombre ?? '—'} (${t.medico?.especialidad ?? '—'})`)
        .text(`Estado: ${t.estado ?? '—'}`);
    });

    doc.end();
    return Buffer.concat(buffers);
  }
}