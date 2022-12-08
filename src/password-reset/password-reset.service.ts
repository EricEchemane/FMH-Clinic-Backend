// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import frontEndOrigin from './front-end-origin';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class PasswordResetService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async generateResetLink(email: string) {
    const user = await this.userService.findOne(email);
    return frontEndOrigin + '/password-reset/' + user.id;
  }

  async sendResetLink(receiverEmail: string, resetLink: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('GMAILSENDER'),
        pass: this.configService.get('GOOGLEPASSWORD'),
      },
    });

    const mailConfig = {
      from: 'FMH Clinic',
      to: receiverEmail,
      subject: `FMH Clinic Account Password Reset`,
      text: 'Hello, you are receiving this because you requested to reset your password. Please follow the instructions accordingly',
      html: `
        <h1> Please do not share this email to anyone to protect your account. Click the reset button to reset your password. </h1>
        <a href="${resetLink}">
          <button style="padding: 1rem; border-radius: .3rem; margin-top: 1rem">
            Reset Password
          </button>
        </a>
      `,
    };

    await transporter.sendMail(mailConfig);
  }

  async resetPassword({ newPassword, userId }: ResetPasswordDto) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new ForbiddenException();
    }
    const hash = await argon.hash(newPassword);
    user.hash = hash;
    await this.userService.saveUser(user);
    return user;
  }
}
