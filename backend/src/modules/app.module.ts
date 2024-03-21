// Core
import { Module } from '@nestjs/common';

// Modules
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [CoreModule, UsersModule, FilesModule],
})
export class AppModule {}
