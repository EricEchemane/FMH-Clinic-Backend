import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';
import { Feedback } from './entities';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private userService: UserService,
  ) {}

  create(createFeedbackDto: CreateFeedbackDto) {
    return 'This action adds a new feedback';
  }

  findAll() {
    return this.feedbackRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
