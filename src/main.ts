import * as config from 'config';

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ServerConfig } from './models/server-config.model';

const bootstrap: () => Promise<void> = async(): Promise<void> => {
  const serverConfig: ServerConfig = config.get('server');
  const logger: Logger = new Logger('bootstrap');
  const app: INestApplication = await NestFactory.create(AppModule);
  const port: number = Number(process.env.PORT) || serverConfig.port;

  // TODO: Find a better way to manage cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
};
bootstrap();
