import { CreateUserDto, SigninUserDto } from './../user/dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AccessToken } from './types';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signin')
  async signin(@Body() dto: SigninUserDto): Promise<AccessToken> {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.authService.generateAccessToken(payload);
  }

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.authService.generateAccessToken(payload);
  }
}
