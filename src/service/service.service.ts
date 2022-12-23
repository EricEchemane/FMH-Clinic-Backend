import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { Service } from './entities';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return this.serviceRepository.save(createServiceDto);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  findOne(id: string) {
    return this.serviceRepository.findOneBy({ id });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
