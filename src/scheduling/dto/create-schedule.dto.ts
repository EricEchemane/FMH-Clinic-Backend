import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PetServices } from '../types';

export class CreateScheduleDto {
  // should be a ISO 8601 date
  // use new Date().toISOString() in Javascript
  @IsDateString()
  date: Date;

  // Email will come from the current authorized user using GetUser decorator
  // email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  pet_name: string;

  @IsEnum(PetServices)
  @IsNotEmpty()
  service: PetServices;

  @IsString()
  concern: string;
}
