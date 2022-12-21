import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await argon.hash(createUserDto.password);
      const user = this.usersRepository.create({
        ...createUserDto,
        hash,
      });
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.startsWith('duplicate key')
      ) {
        throw new ForbiddenException('Credentials already taken');
      }
      throw error;
    }
  }
  async findOne(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) return user;
    throw new NotFoundException(`User with email: ${email} does not exist`);
  }
  async findOneById(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (user) return user;
      throw new NotFoundException(`User with id: ${id} does not exist`);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.startsWith('invalid input syntax for type uuid:')
      ) {
        throw new NotFoundException(`User with id: ${id} does not exist`);
      }
    }
  }
  saveUser(user: User) {
    return this.usersRepository.save(user);
  }
  findAll() {
    return this.usersRepository.find();
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.usersRepository.findOneBy({ id });
    user = { ...user, prefer_color_scheme: updateUserDto.prefer_color_scheme };

    user = await this.usersRepository.save(user);
    return user;
  }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
