import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { Global } from '@nestjs/common/decorators';
import { Schedule } from './entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [SchedulingController],
  providers: [SchedulingService],
  exports: [SchedulingService],
})
export class SchedulingModule {}
