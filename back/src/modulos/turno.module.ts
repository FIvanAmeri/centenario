import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../entities/turno.entity';
import { User } from '../entities/user.entity';
import { Horario } from '../entities/horario.entity';
import { TurnoService } from '../services/turno.service';
import { TurnoController } from '../controllers/turno.controller';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, User, Horario])],
  controllers: [TurnoController],
  providers: [TurnoService, MailService],
})
export class TurnoModule {}