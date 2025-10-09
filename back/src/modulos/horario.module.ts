import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from '../entities/horario.entity';
import { User } from '../entities/user.entity';
import { HorarioService } from '../services/horario.service';
import { HorarioController } from '../controllers/horario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Horario, User])],
  controllers: [HorarioController],
  providers: [HorarioService],
  exports: [HorarioService],
})
export class HorarioModule {}