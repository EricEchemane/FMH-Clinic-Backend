import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  unit_price: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty()
  @IsString()
  @IsUrl()
  image_url: string;
}
