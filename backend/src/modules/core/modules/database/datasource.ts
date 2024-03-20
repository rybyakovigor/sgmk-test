// Core
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Services
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from '../config/config.service';

dotenv.config();

const { config } = new AppConfigService(new ConfigService());

const dataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  username: config.database.username,
  password: config.database.password,
  schema: 'public',
  synchronize: false,
  logging: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: [resolve(__dirname, 'migrations', '*.[t|j]s')],
  entities: [resolve('**', '*.entity{.ts,.js}')],
});

export default dataSource;
