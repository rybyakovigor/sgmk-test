// Core
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';

// Entity
import { UserEntity } from './user.entity';

// Repository
import { UsersRepository } from './users.repository';

// Dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Services
import { PhonesService } from '../phones/phones.service';
import { TransactionService } from '../core/modules/database/transaction.service';

@Injectable()
export class UsersService {
  public constructor(
    private usersRepository: UsersRepository,
    private phonesService: PhonesService,
    private transactionService: TransactionService
  ) {}

  public async findAll(): Promise<[UserEntity[], number]> {
    return await this.usersRepository.findAll();
  }

  public async findById(id: string, tx?: EntityManager): Promise<UserEntity> {
    return await this.checkExists(id, tx);
  }

  public async create(user: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.transactionService.transaction<UserEntity>(async (tx) => {
        await Promise.all(user.phones.map((phone) => this.phonesService.create(phone, tx)));
        return await this.usersRepository.create(user, tx);
      });
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  public async update(id: string, user: UpdateUserDto): Promise<UserEntity> {
    const row = await this.checkExists(id);

    try {
      return await this.transactionService.transaction<UserEntity>(async (tx) => {
        if (user.phones) {
          const deletedPhones = row.phones.filter((p1) => !user.phones.some((p2) => p2.id === p1.id));
          await Promise.all(deletedPhones.map((phone) => this.phonesService.delete(phone.id, tx)));
          await Promise.all(user.phones.map((phone) => this.phonesService.update(phone.id, phone, tx)));
        }

        return await this.usersRepository.update(id, user, tx);
      });
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  public async delete(id: string): Promise<void> {
    await this.checkExists(id);
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  private async checkExists(id: string, tx?: EntityManager): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findById(id, tx);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
