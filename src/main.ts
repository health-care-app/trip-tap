import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import * as config from 'config';

const bootstrap: () => Promise<void> = async (): Promise<void> => {

  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app: INestApplication = await NestFactory.create(AppModule);
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
};
bootstrap();
