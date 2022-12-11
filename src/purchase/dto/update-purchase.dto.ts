import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';

class CreatePurchaseDto {
  @IsBoolean()
  archived: boolean;
}

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}
