import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestUser } from 'src/user/decorators/get-user.decorator';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto';
import { Schedule } from './entities';

@Injectable()
export class SchedulingService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto, user: RequestUser) {
    const newEntry = this.schedulesRepository.create(createScheduleDto);
    await this.schedulesRepository.save({
      ...createScheduleDto,
      email: user.email,
    });
    return newEntry;
  }

  // findAll() {
  //   return `This action returns all scheduling`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} scheduling`;
  // }

  // update(id: number, updateSchedulingDto: UpdateSchedulingDto) {
  //   return `This action updates a #${id} scheduling`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} scheduling`;
  // }
}
