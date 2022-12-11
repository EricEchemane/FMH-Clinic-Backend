import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum } from 'class-validator';
import { ScheduleStatus } from '../types';

class ScheduleForUpdate {
  @IsBoolean()
  archived: boolean;

  @IsEnum(ScheduleStatus)
  status: ScheduleStatus;
}

export class UpdateScheduleDto extends PartialType(ScheduleForUpdate) {}
