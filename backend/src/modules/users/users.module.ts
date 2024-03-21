// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Repository
import { UsersRepository } from './users.repository';

// Entity
import { UserEntity } from './user.entity';

// Services
import { UsersService } from './users.service';

// Controller
import { UsersController } from './users.controller';

// Modules
import { PhonesModule } from '../phones/phones.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PhonesModule, FilesModule],
  providers: [UsersRepository, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
