import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrativo } from '../entities/administrativo.entity';
import { AdministrativoService } from '../services/administrativo.service';
import { AdministrativoController } from '../controllers/administrativo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Administrativo])],
  controllers: [AdministrativoController],
  providers: [AdministrativoService],
})
export class AdministrativoModule {}