import * as config from 'config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DbConfig } from '../models/db-config.model';

const dbConfig: DbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: Number(process.env.RDS_PORT) || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: `${process.env.TYPEORM_SYNC}` === 'true' || dbConfig.synchronize,
};
