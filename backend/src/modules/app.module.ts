// Core
import { Module } from '@nestjs/common';

// Modules
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CoreModule, UsersModule],
})
export class AppModule {}
