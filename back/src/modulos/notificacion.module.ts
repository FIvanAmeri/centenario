import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from '../entities/notificacion.entity';
import { User } from '../entities/user.entity';
import { NotificacionService } from '../services/notificacion.service';
import { NotificacionController } from '../controllers/notificacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion, User])],
  controllers: [NotificacionController],
  providers: [NotificacionService],
})
export class NotificacionModule {}