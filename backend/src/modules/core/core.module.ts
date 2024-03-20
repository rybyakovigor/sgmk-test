// Core
import { APP_PIPE } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

// Modules
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class CoreModule {}
