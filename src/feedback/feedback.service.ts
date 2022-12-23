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
    return this.feedbackRepository.save(feedback);
  }

  findAll() {
    return this.feedbackRepository.find({
      relations: ['user'],
    });
  }

  findAllByUserId(userId: string) {
    return this.feedbackRepository.find({
      where: { user: { id: userId } },
    });
  }

  findOne(id: string) {
    return this.feedbackRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    this.feedbackRepository.merge(feedback, updateFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }

  //remove(id: number) {
  //  return `This action removes a #${id} feedback`;
  //}
}
