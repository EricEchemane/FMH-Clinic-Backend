import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    // return 'hello, world!';
    return this.configService.get('PGDATABASE');
  }
}
