import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancelacion } from '../entities/cancelacion.entity';
import { CancelacionService } from '../services/cancelacion.service';
import { CancelacionController } from '../controllers/cancelacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cancelacion])],
  providers: [CancelacionService],
  controllers: [CancelacionController],
})
export class CancelacionModule {}