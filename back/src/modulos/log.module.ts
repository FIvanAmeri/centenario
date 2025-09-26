import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '../entities/log.entity';
import { LogService } from '../services/log.service';
import { LogController } from '../controllers/log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}