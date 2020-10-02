import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';

import { AppModule } from './app.module';

const bootstrap: () => Promise<void> = async (): Promise<void> => {

  const serverConfig: any = config.get('server');
  const logger = new Logger('bootstrap');
  const app: INestApplication = await NestFactory.create(AppModule);
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
};
bootstrap();
