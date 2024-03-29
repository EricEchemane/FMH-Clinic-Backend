import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateScheduleDto, UpdateScheduleDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { SchedulingService } from './scheduling.service';
import { GetUser, RequestUser } from 'src/user/decorators/get-user.decorator';
import { UserRole } from 'src/user/entities';

@UseGuards(JwtAuthGuard)
@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post()
  create(
    @Body() createSchedulingDto: CreateScheduleDto,
    @GetUser() user: RequestUser,
  ) {
    if (user.role !== UserRole.customer) {
      throw new UnauthorizedException('Only customer can make a schedule');
    }
    return this.schedulingService.create(createSchedulingDto, user);
  }

  @Get()
  findAll() {
    return this.schedulingService.findAll();
  }

  @Get('from-this-month-and-next')
  getSchedulesFromThisMonthAndNext() {
    return this.schedulingService.getSchedulesFromThisMonthAndNext();
  }

  @Get('me')
  getSchedulesOfUser(@GetUser() user: RequestUser) {
    return this.schedulingService.findAllByEmail(user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulingService.findOneBy({ id });
  }

  @Get('schedules/:date')
  getSchedulesOn(@Param('date') date: string) {
    return this.schedulingService.getSchedulesOn(new Date(date));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchedulingDto: UpdateScheduleDto,
  ) {
    return this.schedulingService.update(id, updateSchedulingDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.schedulingService.remove(+id);
  // }
}
