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
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiConsumes, ApiResponse, ApiQuery } from '@nestjs/swagger';

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

// Query
import { UsersQuery } from './users.query';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @ApiQuery({ name: 'name', description: 'Фильтр по имени', required: false })
  @ApiQuery({ name: 'surname', description: 'Фильтр по фамилии', required: false })
  @ApiQuery({ name: 'patronymic', description: 'Фильтр по отчеству', required: false })
  @ApiQuery({ name: 'city', description: 'Фильтр по городу', required: false })
  @ApiQuery({ name: 'street', description: 'Фильтр по улице', required: false })
  @ApiQuery({ name: 'house', description: 'Фильтр по дому', required: false })
  @ApiQuery({ name: 'flat', description: 'Фильтр по квартире', required: false })
  @ApiQuery({ name: 'limit', description: 'Количество выводимых записей, по умолчанию 10', required: false })
  @ApiQuery({ name: 'offset', description: 'Сдвиг по записям, по умолчанию 0', required: false })
  @ApiOperation(UsersSwagger.findAllSummary)
  @ApiResponse(UsersSwagger.findAllOkResponse)
  @Get()
  public async findAll(@Query() query: UsersQuery): Promise<[UserEntity[], number]> {
    return await this.usersService.findAll(query);
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
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation(UsersSwagger.findOneSummary)
  @ApiResponse(UsersSwagger.findOneOkResponse)
  @ApiResponse(UsersSwagger.findOneNotFoundResponse)
  @Get(':id')
  public async findById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity | null> {
    return await this.usersService.findById(id);
  }

  @ApiOperation(UsersSwagger.deleteSummary)
  @ApiResponse(UsersSwagger.deleteOkResponse)
  @ApiResponse(UsersSwagger.findOneNotFoundResponse)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
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
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<{ path: string }> {
    return this.usersService.uploadAvatar(id, file);
  }

  @ApiOperation(UsersSwagger.deleteAvatarSummary)
  @ApiResponse(UsersSwagger.deleteAvatarOkResponse)
  @ApiResponse(UsersSwagger.deleteAvatarConflictResponse)
  @ApiResponse(UsersSwagger.findOneNotFoundResponse)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/delete-avatar')
  public async deleteAvatar(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.usersService.deleteAvatar(id);
  }
}
