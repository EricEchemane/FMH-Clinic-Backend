import { FindOneByFilter } from './types/find-one-filter.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestUser } from 'src/user/decorators/get-user.decorator';
import { QueryFailedError, Repository } from 'typeorm';
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

  findAll() {
    return this.schedulesRepository.find();
  }

  async findOneBy(filter: FindOneByFilter) {
    try {
      const schedule = await this.schedulesRepository.findOneBy(filter);
      return schedule;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.startsWith('invalid input syntax for type uuid:')
      ) {
        throw new NotFoundException('schdule not found');
      }
    }
  }

  // update(id: number, updateSchedulingDto: UpdateSchedulingDto) {
  //   return `This action updates a #${id} scheduling`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} scheduling`;
  // }
}
