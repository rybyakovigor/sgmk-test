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

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersRepository, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
