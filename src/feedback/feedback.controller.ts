import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser, RequestUser } from 'src/user/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @GetUser() user: RequestUser,
  ) {
    return this.feedbackService.create(createFeedbackDto, user.userId);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get('/user/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.feedbackService.findAllByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(id, updateFeedbackDto);
  }

  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.feedbackService.remove(+id);
  //}
}
