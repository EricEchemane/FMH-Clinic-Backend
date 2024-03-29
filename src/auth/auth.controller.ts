import { CreateUserDto, SigninUserDto } from './../user/dto';
import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
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
      domain:
        process.env.NODE_ENV === 'production' ? '.railway.app' : 'localhost',
    });

    return user;
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
    res.cookie('token', '', {
      expires: new Date(),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain:
        process.env.NODE_ENV === 'production' ? '.railway.app' : 'localhost',
    });
    return { message: 'signed out' };
  }
}
