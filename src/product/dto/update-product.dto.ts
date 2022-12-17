import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

class _CreateProductDto extends CreateProductDto {
  @IsBoolean()
  archived: boolean;
}

export class UpdateProductDto extends PartialType(_CreateProductDto) {}
