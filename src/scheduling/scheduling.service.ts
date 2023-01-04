// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOneByFilter } from './types/find-one-filter.type';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestUser } from 'src/user/decorators/get-user.decorator';
import { QueryFailedError, Repository, Between } from 'typeorm';
import { CreateScheduleDto, UpdateScheduleDto } from './dto';
import { Schedule } from './entities';
import { ScheduleStatus } from './types';

@Injectable()
export class SchedulingService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
    private configService: ConfigService,
  ) {}

  async create(createScheduleDto: CreateScheduleDto, user: RequestUser) {
    //const hasScheduleToday = await this.schedulesRepository.findOneBy({
    //  date: new Date(createScheduleDto.date),
    //  status: ScheduleStatus.pending,
    //});
    //if (hasScheduleToday) {
    //  throw new BadRequestException(
    //    'You already have a pending schedule today',
    //  );
    //}

    let newEntry = this.schedulesRepository.create(createScheduleDto);
    newEntry = await this.schedulesRepository.save({
      ...createScheduleDto,
      email: user.email,
      date: new Date(createScheduleDto.date).toDateString(),
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('GMAILSENDER'),
        pass: this.configService.get('GOOGLEPASSWORD'),
      },
    });

    const mailConfig = {
      from: 'FMH Clinic',
      to: user.email,
      subject: `FMH Animal Clinic Appointment`,
      html: `
        <h1> Hello, ${createScheduleDto.name}. Thank you for booking an appointment with us! Please wait for our email for your scheduled time. </h1>

        <div> Thank You! </div>
      `,
    };

    await transporter.sendMail(mailConfig);

    return newEntry;
  }

  findAll() {
    return this.schedulesRepository.find({
      where: { archived: false },
    });
  }

  findAllByEmail(email: string) {
    return this.schedulesRepository.find({
      where: { email },
    });
  }

  async findOneBy(filter: FindOneByFilter) {
    try {
      const schedule = await this.schedulesRepository.findOneBy(filter);
      if (!schedule) {
        throw new NotFoundException('schedule not found');
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

  async getSchedulesOn(date: Date) {
    try {
      const schedules = await this.schedulesRepository.findBy({ date });
      return {
        schedules,
        count: schedules.length,
      };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.startsWith('invalid input syntax for type date:')
      ) {
        throw new BadRequestException('invalid date format');
      }
    }
  }

  async getSchedulesFromThisMonthAndNext() {
    let currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let nextMonth = 1;
    if (currentMonth === 12) {
      currentYear++;
    } else {
      nextMonth = currentMonth + 1;
    }
    const schdules = await this.schedulesRepository.find({
      where: {
        date: Between(
          new Date(currentYear, currentMonth, 1),
          new Date(currentYear, nextMonth, 28),
        ),
        status: ScheduleStatus.pending,
        archived: false,
      },
    });
    return schdules;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} scheduling`;
  // }
}
