import { SendResetLinkDto } from './dto';
import { Controller, Get, Param } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Get(':email')
  async sendResetLink(@Param() { email }: SendResetLinkDto) {
    const resetLink = await this.passwordResetService.generateResetLink(email);
    await this.passwordResetService.sendResetLink(email, resetLink);
  }
}
