import { FindOneByFilter } from './types/find-one-filter.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestUser } from 'src/user/decorators/get-user.decorator';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateScheduleDto, UpdateScheduleDto } from './dto';
import { Schedule } from './entities';

@Injectable()
export class SchedulingService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto, user: RequestUser) {
    let newEntry = this.schedulesRepository.create(createScheduleDto);
    newEntry = await this.schedulesRepository.save({
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
      if (!schedule) {
        throw new NotFoundException('schdule not found');
      }
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

  async update(id: string, dto: UpdateScheduleDto) {
    let schedule = await this.schedulesRepository.findOneBy({ id });
    if (!schedule) {
      throw new NotFoundException('schdule not found');
    }
    schedule = { ...schedule, ...dto };
    await this.schedulesRepository.save(schedule);
    return schedule;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} scheduling`;
  // }
}
