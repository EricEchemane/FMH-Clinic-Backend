import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('FMH Clinic Backend')
  .setVersion('1.0')
  .build();
