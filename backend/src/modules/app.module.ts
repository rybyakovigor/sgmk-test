// Core
import { Module } from '@nestjs/common';

// Modules
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule],
})
export class AppModule {}
