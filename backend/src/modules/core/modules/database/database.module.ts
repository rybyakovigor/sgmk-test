// Core
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';

// Services
import { AppConfigService } from '../config/config.service';
import { TransactionService } from './transaction.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService): TypeOrmModuleOptions => {
        return {
          type: 'postgres',
          host: config.config.database.host,
          port: config.config.database.port,
          database: config.config.database.name,
          username: config.config.database.username,
          password: config.config.database.password,
          schema: 'public',
          synchronize: false,
          autoLoadEntities: true,
          logging: false,
          migrationsRun: true,
          migrationsTableName: 'migrations',
          keepConnectionAlive: true,
          migrations: [resolve(__dirname, 'migrations', '*.[t|j]s')],
        };
      },
    }),
  ],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class DatabaseModule {}
