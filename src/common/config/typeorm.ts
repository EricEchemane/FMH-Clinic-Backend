import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

const typeormConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('PGHOST'),
    port: +configService.get('PGPORT'),
    username: configService.get('PGUSER'),
    password: configService.get('PGPASSWORD'),
    database: configService.get('PGDATABASE'),
    // synchronize: process.env.NODE_ENV === 'development',
    synchronize: true,
    autoLoadEntities: true,
  }),
  inject: [ConfigService],
};

export default typeormConfig;
