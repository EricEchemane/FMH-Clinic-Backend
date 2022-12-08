import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto';
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
  findAll(@GetUser() user: RequestUser) {
    // restrict to customers
    if (user.role === UserRole.customer) {
      throw new UnauthorizedException(
        'You are not allowed to to access this route',
      );
    }
    return this.schedulingService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.schedulingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSchedulingDto: UpdateSchedulingDto,
  // ) {
  //   return this.schedulingService.update(+id, updateSchedulingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.schedulingService.remove(+id);
  // }
}
