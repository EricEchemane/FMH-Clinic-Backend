import { IsEmail } from 'class-validator';

export class SendResetLinkDto {
  @IsEmail()
  email: string;
}
