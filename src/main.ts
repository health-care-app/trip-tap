import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap: () => Promise<void> = async(): Promise<void> => {
  const app: INestApplication = await NestFactory.create(AppModule);

  await app.listen(3000);
};
bootstrap();
