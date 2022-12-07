import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const passwordMatches = await argon.verify(user.hash, password);
    if (passwordMatches) return user;
    return null;
  }
}
