import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ServiceModule } from './service/service.module';
import typeormConfig from './common/config/typeorm';
import getEnvPath from './common/config/get-env-path';

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
    ProductModule,
    CloudinaryModule,
    FeedbackModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
