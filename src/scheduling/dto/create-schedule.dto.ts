import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PetServices } from '../types';

export class CreateScheduleDto {
  // should be a ISO 8601 date
  // use new Date().toISOString() in Javascript
  @ApiProperty()
  @IsDateString()
  date: Date;

  // Email will come from the current authorized user using GetUser decorator
  // email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pet_name: string;

  @ApiProperty()
  @IsEnum(PetServices)
  @IsNotEmpty()
  service: PetServices;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  concern: string;
}
