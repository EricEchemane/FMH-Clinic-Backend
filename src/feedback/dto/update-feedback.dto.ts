import { PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

class CreateFeedbackDto {
  @IsBoolean()
  is_published: boolean;
}

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {}
