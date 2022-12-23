import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';

class CreateFeedbackDto {
  @IsBoolean()
  is_published: boolean;
}

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {}
