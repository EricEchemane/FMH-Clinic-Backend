import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 2900;
  await app.listen(PORT);
}
bootstrap();
