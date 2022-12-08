import { ResetPasswordDto, SendResetLinkDto } from './dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Get(':email')
  async sendResetLink(@Param() { email }: SendResetLinkDto) {
    const resetLink = await this.passwordResetService.generateResetLink(email);
    await this.passwordResetService.sendResetLink(email, resetLink);
  }

  @Post()
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const user = await this.passwordResetService.resetPassword(dto);
    delete user.hash;
    return user;
  }
}
