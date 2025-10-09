import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { MailModule } from '../mail/mail.module';
import { HorarioModule } from '../modulos/horario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailModule,
    HorarioModule, 
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}