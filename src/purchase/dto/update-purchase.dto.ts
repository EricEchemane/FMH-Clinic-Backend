import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

class CreatePurchaseDto {
  @ApiProperty()
  @IsBoolean()
  archived: boolean;
}

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}
