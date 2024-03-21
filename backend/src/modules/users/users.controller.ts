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
import { ApiOperation, ApiTags, ApiConsumes, ApiResponse } from '@nestjs/swagger';

// Services
import { UsersService } from './users.service';

// Dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entity
import { UserEntity } from './user.entity';

// Interceptors
import { FileInterceptor } from '@nestjs/platform-express';

// Swagger
import { UsersSwagger } from './users.swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @ApiOperation(UsersSwagger.findAllSummary)
  @ApiResponse(UsersSwagger.findAllOkResponse)
  @Get()
  public async findAll(): Promise<[UserEntity[], number]> {
    return await this.usersService.findAll();
  }

  @ApiOperation(UsersSwagger.createSummary)
  @ApiResponse(UsersSwagger.createOkResponse)
  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation(UsersSwagger.updateSummary)
  @ApiResponse(UsersSwagger.updateOkResponse)
  @ApiResponse(UsersSwagger.findOneNotFoundResponse)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation(UsersSwagger.findOneSummary)
  @ApiResponse(UsersSwagger.findOneOkResponse)
  @ApiResponse(UsersSwagger.findOneNotFoundResponse)
  @Get(':id')
  public async findById(@Param('id') id: string): Promise<UserEntity | null> {
    return await this.usersService.findById(id);
  }

  @ApiOperation(UsersSwagger.deleteSummary)
  @ApiResponse(UsersSwagger.deleteOkResponse)
  @ApiResponse(UsersSwagger.findOneNotFoundResponse)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    return await this.usersService.delete(id);
  }

  @ApiOperation(UsersSwagger.uploadAvatarSummary)
  @ApiResponse(UsersSwagger.uploadAvatarOkResponse)
  @ApiResponse(UsersSwagger.uploadAvatarLimitResponse)
  @ApiResponse(UsersSwagger.uploadAvatarConflictResponse)
  @ApiResponse(UsersSwagger.findOneNotFoundResponse)
  @HttpCode(HttpStatus.OK)
  @Post(':id/upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: Math.pow(1024, 2) * 5, // 5MB,
      },
    })
  )
  @ApiConsumes('multipart/form-data')
  public async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ): Promise<{ path: string }> {
    return this.usersService.uploadAvatar(id, file);
  }

  @ApiOperation(UsersSwagger.deleteAvatarSummary)
  @ApiResponse(UsersSwagger.deleteAvatarOkResponse)
  @ApiResponse(UsersSwagger.deleteAvatarConflictResponse)
  @ApiResponse(UsersSwagger.findOneNotFoundResponse)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/delete-avatar')
  public async deleteAvatar(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteAvatar(id);
  }
}
