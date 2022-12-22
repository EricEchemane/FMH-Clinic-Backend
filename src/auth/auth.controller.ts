import { CreateUserDto, SigninUserDto } from './../user/dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signin')
  async signin(@Body() dto: SigninUserDto, @Res() res: Response) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      prefer_color_scheme: user.prefer_color_scheme,
    };
    const token = this.authService.generateAccessToken(payload);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.json({ message: 'success' }).end();
  }

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    if (!user) {
      throw new Error('Unable to create user');
    }
    return { message: 'success' };
  }

  @Post('signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', { expires: new Date() });
    return { message: 'signed out' };
  }
}
