// Core
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Dto
import { CreateUserDto } from './dto/create-user.dto';

// Entity
import { UserEntity } from './user.entity';

// Interceptors
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll(): Promise<[UserEntity[], number]> {
    return await this.usersService.findAll();
  }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(createUserDto);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UserEntity): Promise<UserEntity> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<UserEntity | null> {
    return await this.usersService.findById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    return await this.usersService.delete(id);
  }

  @Post(':id/upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ): Promise<{ path: string }> {
    return this.usersService.uploadAvatar(id, file);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/delete-avatar')
  public async deleteAvatar(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteAvatar(id);
  }
}
