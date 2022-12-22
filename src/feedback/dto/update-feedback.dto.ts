import { PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateFeedbackDto } from './create-feedback.dto';

class _CreateFeedbackDto extends CreateFeedbackDto {
  @IsBoolean()
  is_published: boolean;
}

export class UpdateFeedbackDto extends PartialType(_CreateFeedbackDto) {}
