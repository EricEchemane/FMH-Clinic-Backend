import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendResetLinkDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
