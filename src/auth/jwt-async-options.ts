import { ConfigModule, ConfigService } from '@nestjs/config';

export default {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWTSECRET'),
    signOptions: { expiresIn: '1h' },
  }),
  inject: [ConfigService],
};
