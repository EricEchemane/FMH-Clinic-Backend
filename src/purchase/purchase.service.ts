import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { QueryFailedError, Repository } from 'typeorm';
import { CreatePurchaseDto, UpdatePurchaseDto } from './dto';
import { Purchase } from './entities';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    private productService: ProductService,
  ) {}

  async create(dto: CreatePurchaseDto) {
    const product = await this.productService.findOne(dto.productId);
    const total_price = dto.quantity * product.unit_price;
    let newPurchase = this.purchasesRepository.create({
      ...dto,
      total_price,
      product,
    });
    newPurchase = await this.purchasesRepository.save(newPurchase);
    return newPurchase;
  }

  findAll() {
    return this.purchasesRepository.find();
  }

  async findOne(id: string) {
    try {
      const purchase = await this.purchasesRepository.findOneBy({ id });
      if (!purchase) throw new NotFoundException('purchase not found');
      return purchase;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.startsWith('invalid input syntax for type uuid:')
      ) {
        throw new BadRequestException('invalid format of purchase id');
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdatePurchaseDto) {
    let purchase = await this.findOne(id);
    purchase = { ...purchase, ...dto };
    purchase = await this.purchasesRepository.save(purchase);
    return purchase;
  }
}
