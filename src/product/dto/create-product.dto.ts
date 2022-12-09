import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1)
  unit_price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsBoolean()
  archived: boolean;
}
