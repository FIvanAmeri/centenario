import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from '../entities/permiso.entity';
import { PermisoService } from '../services/permiso.service';
import { PermisoController } from '../controllers/permiso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Permiso])],
  providers: [PermisoService],
  controllers: [PermisoController],
  exports: [PermisoService],
})
export class PermisoModule {}