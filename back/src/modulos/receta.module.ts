import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receta } from '../entities/receta.entity';
import { Medicamento } from '../entities/medicamento.entity';
import { User } from '../entities/user.entity';
import { RecetaService } from '../services/receta.service';
import { RecetaController } from '../controllers/receta.controller';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Receta, Medicamento, User])],
  providers: [RecetaService, MailService],
  controllers: [RecetaController],
})
export class RecetaModule {}