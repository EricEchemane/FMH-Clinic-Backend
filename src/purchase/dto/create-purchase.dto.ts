import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreatePurchaseDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsUUID()
  productId: string;
}
