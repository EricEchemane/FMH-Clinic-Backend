import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    let newProduct = this.productsRepository.create(createProductDto);
    newProduct = await this.productsRepository.save(createProductDto);
    return newProduct;
  }

  findAll() {
    return this.productsRepository.find();
  }

  async findOne(id: string) {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) throw new NotFoundException('Product not found');
      return product;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.startsWith('invalid input syntax for type uuid:')
      ) {
        throw new BadRequestException('invalid format of product id');
      }
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let product = await this.findOne(id);
    product = { ...product, ...updateProductDto };
    product = await this.productsRepository.save(product);
    return product;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
