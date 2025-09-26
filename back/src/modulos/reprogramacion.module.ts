import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { Horario } from '../entities/horario.entity';
import { ReprogramacionController } from '../controllers/reprogramacion.controller';
import { ReprogramacionService } from '../services/reprogramacion.service';
import { MailService } from '../mail/mail.service';
import { AuditoriaService } from '../services/auditoria.service';
import { Auditoria } from '../entities/auditoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, Horario, Auditoria])],
  controllers: [ReprogramacionController],
  providers: [ReprogramacionService, MailService, AuditoriaService],
})
export class ReprogramacionModule {}