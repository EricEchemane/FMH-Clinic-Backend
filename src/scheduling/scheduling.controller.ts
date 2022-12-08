import { Controller } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';

@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}
}
