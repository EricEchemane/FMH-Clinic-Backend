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

  async create(createFeedbackDto: CreateFeedbackDto, userId: string) {
    const feedback = this.feedbackRepository.create(createFeedbackDto);
    feedback.user = await this.userService.findOneById(userId);
    delete feedback.user.hash;
    return this.feedbackRepository.save(feedback);
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
