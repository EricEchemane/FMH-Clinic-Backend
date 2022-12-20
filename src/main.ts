import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { whiteList } from './config/cors';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger';
import { urlencoded, json } from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: whiteList,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 2900;
  await app.listen(PORT);
}
bootstrap();
