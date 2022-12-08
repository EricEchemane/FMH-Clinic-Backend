import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import typeormConfig from './config/typeorm';
import getEnvPath from './config/get-env-path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvPath(),
    }),
    TypeOrmModule.forRootAsync(typeormConfig),
    UserModule,
    AuthModule,
    PasswordResetModule,
    SchedulingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
