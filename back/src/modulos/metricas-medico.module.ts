import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMedico } from '../entities/historial-medico.entity';
import { MetricasMedicoService } from '../services/metricas-medico.service';
import { MetricasMedicoController } from '../controllers/metricas-medico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialMedico])],
  controllers: [MetricasMedicoController],
  providers: [MetricasMedicoService],
})
export class MetricasMedicoModule {}