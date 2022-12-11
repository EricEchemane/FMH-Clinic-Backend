import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { ScheduleStatus } from '../types';

class ScheduleForUpdate {
  @ApiProperty()
  @IsBoolean()
  archived: boolean;

  @ApiProperty()
  @IsEnum(ScheduleStatus)
  status: ScheduleStatus;
}

export class UpdateScheduleDto extends PartialType(ScheduleForUpdate) {}
