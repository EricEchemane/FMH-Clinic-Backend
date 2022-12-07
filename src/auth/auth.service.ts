import { JwtService } from '@nestjs/jwt';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { AccessToken, JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordMatches = await argon.verify(user.hash, password);
    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');

    return user;
  }

  generateAccessToken(payload: JwtPayload): AccessToken {
    const access_token = this.jwt.sign(payload);
    return { access_token };
  }
}
