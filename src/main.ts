import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as config from '../node_modules/config';
import { AppModule } from './app.module';
import { ServerConfig } from './models/server-config.model';

const bootstrap: () => Promise<void> = async (): Promise<void> => {
  const serverConfig: ServerConfig = config.get('server');
  const logger: Logger = new Logger('bootstrap');
  const app: INestApplication = await NestFactory.create(AppModule);
  const port: number = Number(process.env.PORT) || serverConfig.port;

  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
};
bootstrap();
