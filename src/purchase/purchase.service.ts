import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto';
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

  // findAll() {
  //   return `This action returns all purchase`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} purchase`;
  // }

  // update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
  //   return `This action updates a #${id} purchase`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} purchase`;
  // }
}
