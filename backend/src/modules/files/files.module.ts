// Core
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Services
import { FilesService } from './files.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join('uploads'),
      serveRoot: '/uploads',
    }),
  ],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
