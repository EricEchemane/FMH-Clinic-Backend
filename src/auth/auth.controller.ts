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
  async signin(
    @Body() dto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.authService.generateAccessToken(payload);

    res.cookie('token', { token }, { httpOnly: true });

    return { message: 'success' };
  }

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.authService.generateAccessToken(payload);
  }
}
