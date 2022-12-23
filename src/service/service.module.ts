import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
